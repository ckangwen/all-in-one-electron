import { BrowserWindow, ipcMain, screen } from "electron"
import { DragEvents, WindowConfigMapParams } from "./types"

const WindowConfigMap = new Map<Electron.IpcMainEvent['processId'], WindowConfigMapParams>()

const getWindowByProcessId = (processId: Electron.IpcMainEvent['processId']) => BrowserWindow.getAllWindows().find(win => win.webContents.getProcessId() === processId)

export const onWindowDrag = () => {
  ipcMain.on(
    DragEvents.DRAG_START,
    function (e, params: { mouseX: number; mouseY: number; }) {
      const processId = e.processId
      const win = getWindowByProcessId(processId)
      if (!win || win.isDestroyed()) {
        return console.error('error dont find win by ELECTRON_DRAG_START')
      }

      const [width, height] = win.getSize()
      const { mouseX, mouseY } = params

      WindowConfigMap.set(processId, {
        width,
        height,
        mouseX,
        mouseY
      })
    }
  );

  ipcMain.on(
    DragEvents.DRAGGING,
    function (e) {
      const processId = e.processId

      // 拖拽开始时，记录的坐标与窗口大小
      const config = WindowConfigMap.get(processId)
      if (!config) return

      const win = getWindowByProcessId(processId)
      if (!win || win.isDestroyed()) return

      // 当前的鼠标位置
      const { x, y } = screen.getCursorScreenPoint()
      const { mouseX, mouseY } = config;

      // 需要移动到的位置
      const nextX = x - mouseX
      const nextY = y - mouseY

      // 当前窗口的位置
      const [oldX, oldY] = win.getPosition()

      // 如果当前位置和需要移动到的位置相同，不做处理
      if ([x, oldX].includes(nextX) && [y, oldY].includes(nextY)) {
        return;
      }

      // 移动窗口
      win.setPosition(Math.max(nextX, 0), Math.max(nextY, 0))

      // reset window size, reason by https://github.com/electron/electron/issues/10862
      const { width, height } = config
      win.setSize(width, height)
    }
  );

  ipcMain.on(
    DragEvents.DRAG_OVER,
    function (e) {
      WindowConfigMap.delete(e.processId)
    }
  )
}
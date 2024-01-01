import { TaskBean, TaskParam } from "./types";
import { formatTaskParam, generateTaskCreated, padStart, sleep } from "./utils";

interface Options {
  username: string;
  password: string;
  apiHost?: string;
  host?: string;
}

type ArrayOrSingle<T> = T | T[];

function getDiaryTitle() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  return `${padStart(month, 2, "0")}-${padStart(day, 2, "0")}`;
}

const CURRENT_YEAR_NOTE_PROJECT_ID = "6591632fe4b044fbebc0e17b";

export class Dida {
  options: Options;
  cookies = "";

  diaryData: TaskBean | null = null;

  private expTime = 0;

  constructor(options: Options) {
    this.options = {
      apiHost: "https://api.dida365.com",
      host: "https://dida365.com",
      ...options,
    };
  }

  request(url: string, options?: RequestInit) {
    const headers = {
      cookie: this.cookies,
      "Content-Type": "application/json",
      "x-device":
        '{"platform":"web","os":"macOS 10.15.7","device":"Chrome 114.0.0.0","name":"","version":4562,"id":"64217d45c3630d2326189adc","channel":"website","campaign":"","websocket":""}',
      ...(options?.headers ?? {}),
    };

    return fetch(this.options.apiHost + url, {
      ...options,
      method: options?.method ?? "GET",
      headers,
    }).then((res) => res.json());
  }

  async checkLogin() {
    if (this.cookies && this.expTime && this.expTime > Date.now()) {
      return;
    }

    const url = `${this.options.apiHost}/api/v2/user/signon?wc=true&remember=true`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        username: this.options.username,
        password: this.options.password,
      }),
      headers: {
        "Content-Type": "application/json",
        "x-device":
          '{"platform":"web","os":"macOS 10.15.7","device":"Chrome 114.0.0.0","name":"","version":4562,"id":"64217d45c3630d2326189adc","channel":"website","campaign":"","websocket":""}',
      },
    });

    this.cookies = res.headers.get("set-cookie") ?? "";
    this.expTime = Date.now() + 1000 * 60 * 60 * 24;
  }

  async create(task: TaskParam) {
    await this.checkLogin();

    const addTasks = Array.isArray(task)
      ? task.map(formatTaskParam)
      : [formatTaskParam(task)];
    return this.request("/api/v2/batch/task", {
      method: "POST",
      body: JSON.stringify({
        add: addTasks,
        addAttachments: [],
        delete: [],
        deleteAttachments: [],
        update: [],
        updateAttachments: [],
      }),
    });
  }

  async delete(task: ArrayOrSingle<{ taskId: string; projectId: string }>) {
    await this.checkLogin();
    const deleteTasks = Array.isArray(task) ? task : [task];

    return this.request("/api/v2/batch/task", {
      method: "POST",
      body: JSON.stringify({
        delete: deleteTasks,
        deleteAttachments: [],
        add: [],
        addAttachments: [],
        update: [],
        updateAttachments: [],
      }),
    });
  }

  async update(task: TaskParam) {
    await this.checkLogin();

    task.modifiedTime = generateTaskCreated();
    const updateTasks = Array.isArray(task)
      ? task.map(formatTaskParam)
      : [formatTaskParam(task)];
    return this.request("/api/v2/batch/task", {
      method: "POST",
      body: JSON.stringify({
        update: updateTasks,
        updateAttachments: [],
        add: [],
        addAttachments: [],
        delete: [],
        deleteAttachments: [],
      }),
    });
  }

  async findDiary() {
    const title = getDiaryTitle();

    await this.checkLogin();

    const result = await this.request("/api/v2/batch/check/0", {
      method: "GET",
    });

    const list: TaskBean[] = result.syncTaskBean.update;
    const notes: TaskBean[] = [];
    list.forEach((item) => {
      if (item.kind === "NOTE") {
        notes.push(item);
      }
    });

    const data = notes.find((item) => item.title === title);
    this.diaryData = data || null;
    return data;
  }

  async createDiary() {
    const title = getDiaryTitle();

    const note = this.diaryData;
    if (!note) {
      return await this.create({
        title,
        content: "",
        kind: "NOTE",
        projectId: CURRENT_YEAR_NOTE_PROJECT_ID,
        startDate: null,
      });
    }

    return null;
  }

  async updateDiary(content: string) {
    const note = this.diaryData;
    if (note?.id) {
      await this.update({
        ...note,
        content,
        startDate: null,
      });
    } else {
      await this.createDiary();
      await sleep(1000);
      await this.updateDiary(content);
    }
  }
}

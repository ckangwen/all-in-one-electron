import { notify } from "~electron-utils/notification/renderer";
import "./index.css";

function Page() {
  const onClick = () => {
    notify("提示", "这是一个通知");
  };

  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={onClick}>notify</button>
    </div>
  );
}

export default Page;

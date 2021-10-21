import { DataProps } from "../App";
import "./domainCom.less";
const Domain = (props: { arr: DataProps[]; onItemClick: Function,selectItem?:any }) => {
  const { arr, onItemClick } = props;
  // console.log(arr);
  return (
    <div className="items">
      {arr.map((item, index) => {
        return (
          <div
            className={item.current ? "item current" : "item"}
            key={index}
            onClick={(e) => onItemClick(item, index)}
          >
            {item.domain}
          </div>
        );
      })}
    </div>
  );
};

export default Domain;

import { useEffect, useState } from "react";
import _ from "lodash";
import "./cascader.less";
import close from './images/close.png'
import Domain from "../domainCom/domainCom";

// export interface DataProps  {
//   id: number;
//   domain: string;
//   current?:boolean;
//   children: ({
//       id: number;
//       domain: string;
//       children: {
//           id: number;
//           domain: string;
//       }[];
//   } | {
//       id: number;
//       domain: string;
//       current?:boolean;
//       children: {
//           id: number;
//           domain: string;
//           current?:boolean;
//           children: {
//               id: number;
//               domain: string;
//               current?:boolean;
//           }[];
//       }[];
//   })[];
// }

export interface DataProps {
  id: number;
  domain: string;
  current?: boolean;
  children?: DataProps[];
}


function Cascader(props:{apidata: DataProps[]}) {
  const [isShow, setisShow] = useState(false);
  const [selectItems, setselectItems] = useState<string[]>([]);
  const [data, setdata] = useState<DataProps[][]>([]);
  // const [dataSource, setdataSource] = useState(apidata);

  const onInit = () => { 
    const {apidata} = props;
    let datax = _.cloneDeep(apidata);
    setdata([datax]);
    setselectItems([]);
  };

  useEffect(() => {
    onInit();
  }, []);

  const onStartClick = () => {
    setisShow(!isShow);
  };

  /**
   * 标记current
   * @param arr
   * @param index
   */
  const markCurrent = (arr: DataProps[], index?: number) => {
    // console.log(arr)
    if (index === null) {
      arr.forEach((item) => {
        item.current = false;
      });
      return;
    }
    arr.forEach((item, i) => {
      if (i === index) {
        item.current = true;
        return;
      }
      item.current = false;
    });
  };

  /**
   *点击选中
   * @param value 层级
   * @param index 第几
   * @param num 当前点击的对象
   */
  const onItemClick = (value: DataProps, index: number, num: number) => {
    console.log(value, index, num);
    if (value.children) {
      let datad = [...data];
      let child = value.children;
      datad.forEach((items, i) => {
        if (i > num) {
          markCurrent(items);
        }
      });
      datad.splice(num + 1);
      selectItems.splice(num);
      datad[num + 1] = child;
      markCurrent(datad[num], index);
      selectItems[num] = value.domain;
      setdata(datad);
      setselectItems(selectItems);
    } else {
      let datad = [...data];
      markCurrent(datad[num], index);
      setdata(datad);
    }
  };

  return (
    <div className="cascader">
      <div className="domain">
        <div className="title" onClick={onStartClick}>
          <div>点击事件放在本标题</div>
          <img src={close} onClick={onStartClick}/>
        </div>
        {isShow ? (
          <div className="menu">
            {/* <div className="all" onClick={onInit}>
              全部
            </div> */}
            {data.map((item, num) => {
              return (
                <div key={num} className="domainArr">
                  <Domain
                    arr={item}
                    selectItem={selectItems}
                    onItemClick={(value: DataProps, index: number) =>
                      onItemClick(value, index, num)
                    }
                  />
                  {/* {selectItems[num] ? (
                    <div className="selectItem">{selectItems[num]}</div>
                  ) : null} */}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Cascader;

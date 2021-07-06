import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCarsAsync } from "../../redux/actions/cars.action";
import toChar from "../../utils/toChar";

const StoryMenu = ({ setCreateForm }) => {
  const dispatch = useDispatch();

  return (
    <div id="client-menu">
      <div className="client-menu-container">
        <ul>
          <li className="add">
            <button onClick={() => setCreateForm(true)}>
              <i className="fas fa-plus"></i>
              <span>Thêm xe mới</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StoryMenu;

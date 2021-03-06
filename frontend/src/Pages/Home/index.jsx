import React, { useState, useEffect } from "react";
import ProjectList from "Pages/Home/ProjectList";
import { ApiRequestType } from "utils/constant";
import axios from "axios";
import useAxios from "hooks/useAxios";

export default function Home() {
  const request = useAxios();
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    let unmounted = false;
    const source = axios.CancelToken.source();
    request(ApiRequestType.GET_PROJECT_LIST).then((res) => {
      if (unmounted) return;
      setProjectList(res.data);
    });
    return function () {
      unmounted = true;
      source.cancel("Cancelling in cleanup");
    };
  }, []);

  return (
    <React.Fragment>
      <ProjectList projectList={projectList} />
    </React.Fragment>
  );
}

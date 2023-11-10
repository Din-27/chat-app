import { Route, Routes } from "react-router-dom";
import { router } from "./routers/router";




function App() {

  return (
    <Routes>
      {router.map((x, y) => <Route key={y} index={x.path === '/' ? true : false} path={x.path} element={x.element} />)}
    </Routes>
  )

}

export default App;

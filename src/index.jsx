import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./app/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import StudentView from "./features/student/StudentView";
import StudentForm from "./features/student/StudentForm";
import StudentDetails from "./features/student/StudentDetails";
import ClassView from "./features/class/ClassView";
import SchoolView from "./features/school/SchoolView";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <StudentView />,
			},
			{
				path: "/add-students",
				element: <StudentForm />,
			},
			{
				path: "/student-details/:studentId",
				element: <StudentDetails />,
			},
			{
				path: "/class",
				element: <ClassView />,
			},
			{
				path: "/school",
				element: <SchoolView />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router}>
				<App />
			</RouterProvider>
		</Provider>
	</React.StrictMode>,
);

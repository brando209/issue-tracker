import { useContext } from "react";
import { projectsContext } from "../contexts/ProjectsContext";

export default function useProjects() {
    return useContext(projectsContext);
}
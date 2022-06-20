import { ProjectStatus } from "../models/project.js";
import Component from "./base.js";
import { prjState } from "../state/state.js";
import { Item } from "./item.js";
export class List extends Component {
    constructor(type) {
        super('list', 'app', false, `${type}-projects`);
        this.type = type;
        this.dragOverHandler = (event) => {
            if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();
                const listEl = this.element.querySelector('ul');
                listEl.classList.add('droppable');
            }
        };
        this.dropHandler = (event) => {
            const prjId = event.dataTransfer.getData('text/plain');
            prjState.moveProject(prjId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
        };
        this.dragLeaveHandler = (_) => {
            const listEl = this.element.querySelector('ul');
            listEl.classList.remove('droppable');
        };
        this.assignedProjects = [];
        this.configure();
        this.contentRender();
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        prjState.addListener((projects) => {
            const relevantProjects = projects.filter(prj => this.type === 'active' ? prj.status === ProjectStatus.Active : prj.status === ProjectStatus.Finished);
            this.assignedProjects = relevantProjects;
            this.projectsRender();
        });
    }
    contentRender() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').innerText = `${this.type.toUpperCase()}PROJECTS`;
    }
    projectsRender() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = '';
        for (const prjItem of this.assignedProjects) {
            new Item(this.element.querySelector('ul').id, prjItem);
        }
    }
}

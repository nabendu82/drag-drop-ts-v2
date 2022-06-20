import { prjState } from "../state/state.js";
import Component from "./base.js";
export class Input extends Component {
    constructor() {
        super('project', 'app', true, 'user-input');
        this.titleElem = this.element.querySelector('#title');
        this.descElem = this.element.querySelector('#description');
        this.peopleElem = this.element.querySelector('#people');
        this.configure();
    }
    configure() {
        this.element.addEventListener('submit', e => {
            e.preventDefault();
            let userInput = [this.titleElem.value, this.descElem.value, +this.peopleElem.value];
            const [title, desc, people] = userInput;
            prjState.addProject(title, desc, people);
            this.titleElem.value = '';
            this.descElem.value = '';
            this.peopleElem.value = '';
        });
    }
    contentRender() { }
}

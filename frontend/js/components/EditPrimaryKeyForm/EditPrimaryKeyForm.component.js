import Forms from "../../services/Forms.service.js";
import Actions from "../../services/Action.service.js";

class EditPrimaryKeyForm extends HTMLElement {
    get tableName() {
        return this.getAttribute("tableName");
    }

    get tableIndex() {
        return this.getAttribute("tableIndex");
    }

    get data() {
        return JSON.parse(this.getAttribute("colData"));
    }

    connectedCallback() {
        this.render()
        Forms.formButtonHandler("edit-pk-form", "edit-pk-button");
        if (document.getElementById("createIndexModal")) {
            document
                .getElementById("createIndexModal")
                .querySelector("i")
                .addEventListener("click", () => {
                    Actions.closeSecIndexModal();
                });
        }

        if (document.getElementById("edit-pk-button")) {
            document
                .getElementById("edit-pk-button")
                .addEventListener("click", () => {
                    Actions.updatePrimayKeys(
                        this.tableIndex,
                        this.tableName,
                    );
                });
        }

        this.data.map((row, idx) => {
            document
                .getElementById("checkbox-" + row + "-" + idx)
                .addEventListener("click", () => {
                    Actions.changeCheckBox(row, idx);
                });
        });
    }

    render() {
        this.innerHTML = `
    <form id="edit-pk-form">
        <div id="newIndexColumnListDiv" class="column-list-container">
              ${this.data
                .map((row, idx) => {
                    return `
                <div class="new-index-column-list" id="indexColumnRow${idx}">
                    <span class="order-id invisible-badge" id="order${row}${idx}">1</span>
                    <span class="column-name">${row}</span>
                    <span class="bmd-form-group is-filled">
                        <div class="checkbox float-right" >
                            <label>
                                <input type="checkbox" value="" id="checkbox-${row}-${idx}">
                                <span class="checkbox-decorator"><span id="index-checkbox-${row}-${idx}" class="check black-border" ></span>
                                    <div class="ripple-container"></div>
                                </span>
                            </label>
                        </div>
                    </span>
                </div>`;
                })
                .join("")}  
        </div>
    </form>`;
    }

    constructor() {
        super();
    }
}

window.customElements.define("hb-edit-pk-form", EditPrimaryKeyForm);

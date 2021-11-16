import "./../../components/DataTableTest/DataTableTest.component.js";
import "./../../components/TableCarouselTest/TableCarouselTest.component.js";
import "./../../components/Modal/Modal.component.js";

// Services
import Actions from "./../../services/Action.service.js";
import Store from "./../../services/Store.service.js";
import "../../services/Fetch.service.js";

// constants
class SchemaTest extends HTMLElement {

    connectedCallback() {
        this.stateObserver = setInterval(this.observeState, 150);
        Actions.showSpinner()
        this.tables = Store.getTables();
        this.render();
    }

    disconnectedCallback() {
        clearInterval(this.stateObserver);
    }

    observeState = () => {
        let updatedData = Store.getinstance();
        if (JSON.stringify(updatedData) !== JSON.stringify(this.data)) {
            // console.log('rerender..');
            // console.log(JSON.stringify(updatedData), JSON.stringify(this.data));
            console.log(this.data);
            this.data = JSON.parse(JSON.stringify(updatedData));
            this.render();
        }
    };

    sendDatatoReportTab(tables) {
        for (let i = 0; i < tables.length; i++) {
            let component = document.querySelector(`#reportTab${i}`);
            component.data = tables[i];
        }
    }

    render() {
        if (!this.data || !this.tables) return;
        this.innerHTML = `
        <div class="summary-main-content">
            ${this.tables.map((table, index) => `
            <hb-table-carousel-test tableTitle="${table.sp.Name}" id="reportTab${index}" tabId="report"
                    tableIndex="${index}" borderData = "ORANGE"></hb-table-carousel-test>
            `).join("")}
        </div > 
        <hb-modal modalId="globalDataTypeModal" content="<hb-edit-global-datatype-form></hb-edit-global-datatype-form>"
      contentIcon="" connectIconClass="" modalBodyClass="edit-global-data-type" title="Global Data Type Mapping"></hb-modal>
    <hb-modal modalId="index-and-key-delete-warning" content="" contentIcon="warning"
      connectIconClass="warning-icon" modalBodyClass="connection-modal-body" title="Warning"></hb-modal>
    <hb-modal modalId="editTableWarningModal" content="edit table" contentIcon="cancel"
      connectIconClass="connect-icon-failure" modalBodyClass="connection-modal-body" title="Error Message"></hb-modal>
    <hb-modal modalId="createIndexModal" content="" contentIcon=""
      connectIconClass="" modalBodyClass="" title="Select keys for new index"></hb-modal>
        `;

        this.sendDatatoReportTab(this.tables);
    }
    constructor() {
        super();
    }
}

window.customElements.define("hb-schema-test", SchemaTest);



{/* <hb-data-table-test tableName="${table.sp.Name}" tableIndex="${index}" ></hb-data-table-test>
this.data.tableData.tables.forEach(element => {
    document.querySelector(`hb-data-table-test[tableName=${element.sp.Name}]`).data = element;
}); */}
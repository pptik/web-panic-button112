import React, { Component } from "react";
import Layout from "../../components/LayoutComponent";
import CaseTable from "../../components/Tables/CaseTable";
import { Input } from "@material-tailwind/react";

export default class CasePage extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      showAdd: false,
      searchQuery: "",
      selectedDevice: null,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleOpen(device) {
    this.setState({ show: !this.state.show, selectedDevice: device });
  }

  handleAddOpen() {
    this.setState({ showAdd: !this.state.showAdd });
  }

  render() {
    return (
      <Layout>
        <div className="flex flex-col gap-2">
          <h1 className="text-sm">Dashboard / Kasus Kejadian</h1>
          <h1 className="text-xl text-main font-bold tracking-wide">
            Kasus Kejadian
          </h1>
          <div className="bg-white p-3">
            <div className="mt-3 flex gap-3">
              <Input
                type="text"
                label="Cari nama ..."
                name="searchQuery"
                value={this.state.searchQuery}
                onChange={this.handleInputChange}
              />
            </div>
            <CaseTable
              searchQuery={this.state.searchQuery}
              onEdit={this.handleOpen.bind(this)}
            />
          </div>
        </div>
      </Layout>
    );
  }
}

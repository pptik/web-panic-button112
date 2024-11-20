import React, { Component } from "react";
import Layout from "../../components/LayoutComponent";
import { Input } from "@material-tailwind/react";
import AnnouncementTable from "../../components/Tables/AnnouncementTable";
import ReportToOpd from "../../components/Modals/ReportToOpd";

export default class AnnouncementPage extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      showAdd: false,
      searchQuery: "",
      selected: null,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleOpen(data) {
    this.setState({ show: !this.state.show, selected: data });
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
            <AnnouncementTable
              searchQuery={this.state.searchQuery}
              onEdit={this.handleOpen.bind(this)}
            />
          </div>
        </div>
        {this.state.show && (
          <ReportToOpd
            isOpen={this.state.show}
            onClose={() => this.setState({ show: false })}
            data={this.state.selected}
          />
        )}
      </Layout>
    );
  }
}

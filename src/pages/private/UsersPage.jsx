import React, { Component } from "react";
import Layout from "../../components/LayoutComponent";
import UserTable from "../../components/Tables/UserTable";
import { Button, Input, Tooltip } from "@material-tailwind/react";
import { BiPlus } from "react-icons/bi";
import { AddUser } from "../../components/Modals/AddUser";
import { UpdateUser } from "../../components/Modals/UpdateUser";

class UsersPage extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      showAdd: false,
      searchQuery: "",
      selectedDevice: null,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleAddOpen = this.handleAddOpen.bind(this);
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
          <h1 className="text-sm">Dashboard / Manajemen Pengguna</h1>
          <h1 className="text-xl text-main font-bold tracking-wide">
            Manajemen Pengguna
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
              <Tooltip content="Tambah Pengguna">
                <Button
                  className="bg-main min-w-10"
                  onClick={this.handleAddOpen.bind(this)}
                >
                  <BiPlus />
                </Button>
              </Tooltip>
            </div>
            <UserTable
              searchQuery={this.state.searchQuery}
              onEdit={this.handleOpen.bind(this)}
            />
          </div>
        </div>
        {this.state.showAdd && (
          <AddUser
            isOpen={this.state.showAdd}
            onClose={() => this.setState({ showAdd: false })}
          />
        )}
        {this.state.show && (
          <UpdateUser
            isOpen={this.state.show}
            onClose={() => this.setState({ show: false })}
          />
        )}
      </Layout>
    );
  }
}

export default UsersPage;

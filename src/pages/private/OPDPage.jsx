import { Button, Input, Tooltip } from "@material-tailwind/react";
import React, { Component } from "react";
import { BiPlus } from "react-icons/bi";
import OPDTable from "../../components/Tables/OPDTable";
import Layout from "../../components/LayoutComponent";
import { AddOPD } from "../../components/Modals/AddOPD";
import { UpdateOPD } from "../../components/Modals/UpdateOPD";

export default class OPDPage extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      showAdd: false,
      searchQuery: "",
      selectedDevice: null,
      usersLocation: { lat: -6.905977, lng: 107.613144 },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.setUserLocation(); // Set user location on mount
  }

  setUserLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          usersLocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      },
      () => {
        console.warn("Geolocation not available; using default location.");
      }
    );
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleOpen(device) {
    this.setUserLocation();
    this.setState({ show: !this.state.show, selectedDevice: device });
  }

  handleAddOpen() {
    this.setUserLocation();
    this.setState({ showAdd: !this.state.showAdd });
  }

  render() {
    return (
      <Layout>
        <div className="flex flex-col gap-2">
          <h1 className="text-sm">Dashboard / Daftar OPD</h1>
          <h1 className="text-xl text-main font-bold tracking-wide">
            OPD Terdaftar
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
              <Tooltip content="Tambah OPD">
                <Button
                  className="bg-main min-w-10"
                  onClick={this.handleAddOpen.bind(this)}
                >
                  <BiPlus />
                </Button>
              </Tooltip>
            </div>
            <OPDTable
              searchQuery={this.state.searchQuery}
              onEdit={this.handleOpen.bind(this)}
            />
          </div>
        </div>
        {this.state.showAdd && (
          <AddOPD
            isOpen={this.state.showAdd}
            onClose={() => this.setState({ showAdd: false })}
            initialCenter={this.state.usersLocation}
          />
        )}
        {this.state.show && (
          <UpdateOPD
            isOpen={this.state.show}
            onClose={() => this.setState({ show: false })}
            data={this.state.selectedDevice}
            initialCenter={this.state.usersLocation}
          />
        )}
      </Layout>
    );
  }
}

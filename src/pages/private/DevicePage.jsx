import React, { Component } from "react";
import Layout from "../../components/LayoutComponent";
import DeviceTable from "../../components/Tables/DeviceTable";
import { Button, Input, Tooltip } from "@material-tailwind/react";
import { BiPlus } from "react-icons/bi";
import { AddDevice } from "../../components/Modals/AddDevice";
import { UpdateDevice } from "../../components/Modals/UpdateDevice";

export default class DevicePage extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      showAdd: false,
      searchQuery: "",
      selectedDevice: null,
      usersLocation: { lat: -6.905977, lng: 107.613144 }, // Default location
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
    this.setUserLocation(); // Update location before opening modal
    this.setState({ show: true, selectedDevice: device });
  }

  handleAddOpen() {
    this.setUserLocation(); // Update location before opening modal
    this.setState((prevState) => ({ showAdd: !prevState.showAdd }));
  }

  render() {
    return (
      <Layout>
        <div className="flex flex-col gap-2">
          <h1 className="text-sm">Dashboard / Perangkat</h1>
          <h1 className="text-xl text-main font-bold tracking-wide">
            Perangkat Terdaftar
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
              <Tooltip content="Tambah Perangkat">
                <Button
                  className="bg-main min-w-10"
                  onClick={() => this.handleAddOpen()}
                >
                  <BiPlus />
                </Button>
              </Tooltip>
            </div>
            <DeviceTable
              searchQuery={this.state.searchQuery}
              onEdit={(device) => this.handleOpen(device)}
            />
          </div>
        </div>
        {this.state.showAdd && (
          <AddDevice
            isOpen={this.state.showAdd}
            onClose={() => this.setState({ showAdd: false })}
            initialCenter={this.state.usersLocation}
          />
        )}
        {this.state.show && (
          <UpdateDevice
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

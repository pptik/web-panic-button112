import React, { Component } from "react";
import Layout from "../../components/LayoutComponent";
import {
  Input,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import OPDAnnouncementTable from "../../components/Tables/OPDAnnouncementTable";
import { EStatusCase } from "../../helpers/types/EStatusCase"; // Adjust the path as needed
import OPDCaseTable from "../../components/Tables/OPDCaseTable";
import HandlingCaseTable from "../../components/Tables/HandlingCaseTable";
import { UpdateCase } from "../../components/Modals/UpdateCase";

export default class OPDAnnouncementPage extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      showAdd: false,
      searchQuery: "",
      selected: null,
      page: 0, // Start from 0 since DataGrid uses zero-based indexing
      limit: 10,
      isHandled: false,
      status: EStatusCase.MENUNGGU_RESPON_OPD, // Default status
    };
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlePageChange = (newPage) => {
    this.setState({ page: newPage });
  };

  handlePageSizeChange = (newPageSize) => {
    this.setState({ limit: newPageSize, page: 0 }); // Reset to first page
  };

  handleOpen = (data) => {
    this.setState({ show: !this.state.show, selected: data });
  };

  handleAddOpen = () => {
    this.setState({ showAdd: !this.state.showAdd });
  };

  handleStatusChange = (status) => {
    this.setState({ status, page: 0 }); // Reset to first page on status change
  };

  handleCaseStatusChange = (newStatus) => {
    this.setState({ status: newStatus, page: 0 });
    this.handleStatusChange(newStatus);
  };

  render() {
    const { page, limit, status, searchQuery, isHandled } = this.state;

    return (
      <Layout>
        <div className="flex flex-col gap-2">
          <h1 className="text-sm">Dashboard / Kasus Kejadian</h1>
          <h1 className="text-xl text-main font-bold tracking-wide">
            Kasus Kejadian
          </h1>
          <div className="bg-white p-3">
            <Tabs
              value={status}
              onChange={(value) => this.handleStatusChange(value)}
            >
              <TabsHeader className="bg-main">
                {Object.values(EStatusCase).map((statusValue) => (
                  <Tab key={statusValue} value={statusValue}>
                    {statusValue}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                {Object.values(EStatusCase).map((statusValue) => (
                  <TabPanel key={statusValue} value={statusValue}>
                    <div className="mt-3 flex gap-3">
                      <Input
                        type="text"
                        label="Cari nama ..."
                        name="searchQuery"
                        value={searchQuery}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    {statusValue === EStatusCase.SELESAI ? (
                      <OPDCaseTable
                        searchQuery={searchQuery}
                        page={page}
                        limit={limit}
                        status={statusValue}
                        handle={isHandled}
                        onPageChange={this.handlePageChange}
                        onPageSizeChange={this.handlePageSizeChange}
                        onEdit={this.handleOpen.bind(this)}
                      />
                    ) : statusValue === EStatusCase.DALAM_PENANGANAN ? (
                      <HandlingCaseTable
                        searchQuery={searchQuery}
                        page={page}
                        limit={limit}
                        status={statusValue}
                        handle={isHandled}
                        onPageChange={this.handlePageChange}
                        onPageSizeChange={this.handlePageSizeChange}
                        onEdit={this.handleOpen.bind(this)}
                      />
                    ) : (
                      <OPDAnnouncementTable
                        onStatusChange={this.handleCaseStatusChange}
                        searchQuery={searchQuery}
                        page={page}
                        limit={limit}
                        status={statusValue}
                        handle={isHandled}
                        onPageChange={this.handlePageChange}
                        onPageSizeChange={this.handlePageSizeChange}
                        onEdit={this.handleOpen.bind(this)}
                      />
                    )}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </div>
        </div>
        {this.state.show && (
          <UpdateCase
            isOpen={this.state.show}
            onClose={() => this.setState({ show: false })}
            data={this.state.selected}
          />
        )}
      </Layout>
    );
  }
}

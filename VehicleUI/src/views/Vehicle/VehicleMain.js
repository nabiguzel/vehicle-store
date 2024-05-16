import React, { useEffect, useState } from "react";

import axios from "axios";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/DataTable.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "@material-ui/core/Button";

// Config
import config from "../../config.js";

// Modal
import VehicleModal from "./VehicleModal.js";

// Style
import "./Vehicle.css";

const VehicleMain = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editedVehicle, setEditedVehicle] = useState(undefined);
  const [removeSelected, setRemoveSelected] = useState(false);

  //#region Actions
  const getVehicleListAction = () => {
    axios({
      method: "post",
      url: `${config.DefaultApiUrl}/vehicle/all`,
      data: {},
      transformResponse: [
        (data) => {
          setVehicleData(JSON.parse(data));
          setRemoveSelected(false);
        },
      ],
    });
  };

  const addOrUpdateVehicleActions = (data) => {
    const method = data.VehicleId ? "put" : "post";
    axios({
      method: method,
      url: `${config.DefaultApiUrl}/vehicle`,
      data: data,
      transformResponse: [
        () => {
          setShowModal(false);
          alert("Kayıt işlemi tamamlanmıştır");
          getVehicleListAction();
        },
      ],
    });
  };

  const deleteVehicleActions = (data) => {
    console.log(data);
    axios({
      method: "delete",
      url: `${config.DefaultApiUrl}/vehicle/${data[0]}`,
      transformResponse: [
        () => {
          alert("Silme işlemi tamamlanmıştır");
          setRemoveSelected(true);
          getVehicleListAction();
        },
      ],
    });
  };

  //#endregion

  useEffect(() => {
    getVehicleListAction();
  }, []);

  const newVehicle = () => {
    setEditedVehicle({
      Active: true,
      VehicleName: "",
      VehicleId: undefined,
    });
    setShowModal(true);
  };

  const cells = [
    {
      id: "VehicleName",
      numeric: false,
      disablePadding: true,
      label: "Vehicle Name",
      dataType: "text",
    },
    {
      id: "Active",
      numeric: false,
      disablePadding: false,
      label: "Is Active",
      dataType: "boolean",
    },
  ];
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <p>
              Click to add a <Button onClick={newVehicle}>New Vehicle</Button>
            </p>
          </CardHeader>
          <CardBody>
            {vehicleData && (
              <Table
                headCells={cells}
                data={vehicleData}
                primaryId="VehicleId"
                handleEdit={(rowData) => {
                  setEditedVehicle(rowData);
                  setShowModal(true);
                }}
                handleDelete={(rows) => {
                  deleteVehicleActions(rows);
                }}
                removeSelected={removeSelected}
              />
            )}
          </CardBody>
        </Card>
      </GridItem>
      {showModal && (
        <VehicleModal
          open={showModal}
          detail={editedVehicle}
          handleClose={() => setShowModal(false)}
          addOrUpdateVehicle={(data) => addOrUpdateVehicleActions(data)}
        />
      )}
    </GridContainer>
  );
};

export default VehicleMain;

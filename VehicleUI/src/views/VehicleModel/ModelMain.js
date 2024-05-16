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
import ModelModal from "./ModelModal.js";

// Style
import "./Model.css";

const ModelMain = () => {
  const [modelData, setModelData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editedModel, setEditedModel] = useState(undefined);
  const [removeSelected, setRemoveSelected] = useState(false);

  //#region Actions
  const getBrandListAction = () => {
    axios({
      method: "post",
      url: `${config.DefaultApiUrl}/model/all`,
      data: {},
      transformResponse: [
        (data) => {
          setBrandData(JSON.parse(data));
          setRemoveSelected(false);
        },
      ],
    });
  };
 
  const getModelListAction = () => {
    axios({
      method: "post",
      url: `${config.DefaultApiUrl}/model/all`,
      data: {},
      transformResponse: [
        (data) => {
          setModelData(JSON.parse(data));
          setRemoveSelected(false);
        },
      ],
    });
  };

  const addOrUpdateModelActions = (data) => {
    const method = data.ModelId ? "put" : "post";
    axios({
      method: method,
      url: `${config.DefaultApiUrl}/model`,
      data: data,
      transformResponse: [
        () => {
          setShowModal(false);
          alert("Kayıt işlemi tamamlanmıştır");
          getModelListAction();
        },
      ],
    });
  };

  const deleteModelActions = (data) => {
    console.log(data);
    axios({
      method: "delete",
      url: `${config.DefaultApiUrl}/model/${data[0]}`,
      transformResponse: [
        () => {
          alert("Silme işlemi tamamlanmıştır");
          setRemoveSelected(true);
          getModelListAction();
        },
      ],
    });
  };

  //#endregion

  useEffect(() => {
    getModelListAction();
    getBrandListAction();
  }, []);

  const newModel = () => {
    setEditedModel({
      Active: true,
      ModelName: "",
      ModelId: undefined,
    });
    setShowModal(true);
  };

  const cells = [
    {
      id: "ModelName",
      numeric: false,
      disablePadding: true,
      label: "Model Name",
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
              Click to add a <Button onClick={newModel}>New Model</Button>
            </p>
          </CardHeader>
          <CardBody>
            {modelData && (
              <Table
                headCells={cells}
                data={modelData}
                primaryId="ModelId"
                handleEdit={(rowData) => {
                  setEditedModel(rowData);
                  setShowModal(true);
                }}
                handleDelete={(rows) => {
                  deleteModelActions(rows);
                }}
                removeSelected={removeSelected}
              />
            )}
          </CardBody>
        </Card>
      </GridItem>
      {showModal && (
        <ModelModal
          open={showModal}
          brandList={brandData}
          detail={editedModel}
          handleClose={() => setShowModal(false)}
          addOrUpdateModel={(data) => addOrUpdateModelActions(data)}
        />
      )}
    </GridContainer>
  );
};

export default ModelMain;

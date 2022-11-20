import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect } from "react";

import "./Home.css";
import { AgGridReact } from "ag-grid-react";
import { gql, useQuery } from "@apollo/client";
import { CircleSpinnerOverlay } from "react-spinner-overlay";
import { useHistory, withRouter } from "react-router-dom";

const BtnCellRenderer: React.FC = (props: any) => {
  const btnClickedHandler = () => {
    props.clicked(props.value);
  };

  return <button onClick={btnClickedHandler}>{props.value} diff view</button>;
};

const Home: React.FC = () => {
  const GET_ROW_DATA = gql`
    query MyQuery {
      progress_bible_language_details(order_by: { id: asc }, limit: 1000) {
        code_status
        ethnologue_name
        how_to_fix
        id
        is_sign_language
        iso_639_3_code
        language_scope
        language_status
        primary_continent
        primary_country_code
        primary_country_name
        retired_date
        show_active_dialect
        retirement_explanation
        show_active_language
        show_retired_dialect
        show_retired_language
        show_sign_language
        unit_code
        unit_full_name
        unit_name
        unit_type
      }
    }
  `;

  const columnDefs = [
    {
      field: "id",
      cellRenderer: BtnCellRenderer,
      cellRendererParams: {
        clicked: function (field: any) {
          history.push(`/diff?rowId=${field}`);
          document.location.reload();
        },
      },
    },
    { field: "unit_code", editable: true },
    { field: "unit_type", editable: true },
    { field: "unit_name", editable: true },
    { field: "unit_full_name", editable: true },
    { field: "ethnologue_name", editable: true },
    { field: "iso_639_3_code", editable: true },
    { field: "is_sign_language", editable: true },
    { field: "code_status", editable: true },
    { field: "language_status", editable: true },
    { field: "language_scope", editable: true },
    { field: "primary_continent", editable: true },
    { field: "primary_country_name", editable: true },
    { field: "primary_country_code", editable: true },
    { field: "retirement_explanation", editable: true },
    { field: "how_to_fix", editable: true },
    { field: "retired_date", editable: true },
    { field: "show_active_language", editable: true },
    { field: "show_retired_language", editable: true },
    { field: "show_active_dialect", editable: true },
    { field: "show_retired_dialect", editable: true },
    { field: "show_sign_language", editable: true },
  ];
  const { loading, error, data } = useQuery(GET_ROW_DATA, {
    variables: { language: "english" },
  });
  useEffect(() => {}, []);
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  // if (error) {
  //   return <div>Error! {error.message}</div>;
  // } else
  const history = useHistory();
  console.log("graphqlData", data);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>openlanguages.io</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large"></IonTitle>
          </IonToolbar>
        </IonHeader>
        <div
          className="ag-theme-alpine"
          style={{ width: "auto", height: "90vh" }}
        >
          <CircleSpinnerOverlay
            loading={loading}
            overlayColor="rgba(0,153,255,0.2)"
          ></CircleSpinnerOverlay>
          <AgGridReact
            rowData={data ? data.progress_bible_language_details : []}
            columnDefs={columnDefs}
            pagination={true}
            editType="fullRow"
            // onRowClicked={(event) => {
            //   history.push(`/diff?rowId=${event.data.id}`);
            //   document.location.reload();
            // }}
          ></AgGridReact>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default withRouter(Home);

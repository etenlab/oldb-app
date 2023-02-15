import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
// import { gql, useQuery } from "@apollo/client";
import { withRouter } from "react-router-dom";

// This button will redirect you to the diff view of that row
// const BtnCellRenderer: React.FC = (props: any) => {
//   const btnClickedHandler = () => {
//     props.clicked(props.value);
//   };

//   return <button onClick={btnClickedHandler}>{props.value} diff view</button>;
// };

// This button will render the edit button
// const EditBtnCellRenderer: React.FC = (props: any) => {
//   const btnClickedHandler = () => {
//     props.clicked(props.value);
//   };

//   return (
//     <button onClick={btnClickedHandler}>
//       {props.value} {props.buttonText}
//     </button>
//   );
// };

const Home: React.FC = () => {
  /*
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
        buttonText: "diff view",
      },
    },
    {
      field: "edit_submit",
      cellRenderer: EditBtnCellRenderer,
      cellRendererParams: {
        clicked: function (field: any) {},
        buttonText: "Edit Button",
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
  */

  // const history = useHistory();
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
        <IonContent>

          <IonList>
            <IonItem>
              <a href="/sli">SLI</a>
            </IonItem>
          </IonList>
          {/* <IonGrid>
            <IonItem href="/table/iso-639-2">ISO 639 2</IonItem>
            <IonItem href="/table/glottolog-language">Glottolog Language</IonItem>
            <IonItem href="/table/sil-language-index">Sil Language Index</IonItem>
          </IonGrid> */}
        </IonContent>
        {/* <div
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
          ></AgGridReact>
        </div> */}
      </IonContent>
    </IonPage>
  );
};

export default withRouter(Home);

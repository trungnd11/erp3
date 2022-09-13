/* eslint-disable react/no-array-index-key */
import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { Row, Label, Col, Input, FormFeedback, Form } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../utils/validate-utils";
import { getPrivileges, getRoles } from "../../store/auth/authorization";
import BoardAll from "../../Components/Board/BoardAll";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

const columns = [
  {
    id: "role_code",
    numeric: false,
    disablePadding: true,
    label: "Role Code",
    sort: true,
    width: "25%",
  },
  {
    id: "role_name",
    numeric: true,
    disablePadding: false,
    label: "Role Name",
    width: "25%",
  },
  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "Descriptions",
    width: "50%",
  },
];

function List({ item }) {
  return (
    <>
      <td>
        <span component="span">{item.code}</span>
      </td>
      <td>
        <span component="span">{item.name}</span>
      </td>
      <td>
        <div>
          {item.privileges.map((privilege, index) => (
            <p key={index}>{`- ${privilege.description}`}</p>
          ))}
        </div>
      </td>
    </>
  );
}

function PositionCommonForm({ position, isEditable }, ref) {
  const roles = useSelector((state) => state.authorization.roles);
  const privileges = useSelector((state) => state.authorization.privileges);
  const dispatch = useDispatch();
  const refBoard = useRef();
  const [validate, setValidate] = useState({
    name: false,
    description: false,
  });

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      descriptions: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Positions Name"),
    }),
    onSubmit: (values) => {
      // dispatch(login(values.email, values.password, values.rememberMe));
    },
  });

  const fetchData = async () => {
    if (!roles) {
      await dispatch(getRoles());
    }
    if (!privileges) {
      await dispatch(getPrivileges());
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (position) {
      refBoard.current.setSelectedRow(position.roles);
      validation.setValues({name: position.name, descriptions: position.descriptions});
      console.log(validation);
    }
  }, [position]);

  useImperativeHandle(ref, () => ({
    getData: () => ({...validation.values,roles: refBoard.current.getSelectedRow()}),
  }));

  return (
    <div>
      <Form>
        <Row container>
          <Col item xs={2}>
            <Label component="label" sx={{ fontSize: "1rem" }}>
              Name
              <span style={{ color: "red" }}>*</span>
            </Label>
          </Col>
          <Col item xs={10}>
            <Input
              name="name"
              disabled={!isEditable}
              placeholder="Enter position name"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.name || ""}
              invalid={
                validation.touched.name && validation.errors.name
                  ? true
                  : false
              }
            />
            {validation.touched.name &&
            validation.errors.name ? (
              <FormFeedback type="invalid">
                {validation.errors.name}
              </FormFeedback>
            ) : null}
          </Col>
        </Row>
        <Row style={{ marginTop: "1rem" }}>
          <Col item xs={2}>
            <Label component="label" sx={{ fontSize: "1rem" }}>
              Descriptions
            </Label>
          </Col>
          <Col item xs={10}>
            <Input
              name="descriptions"
              type="textarea"
              minRows={3}
              disabled={!isEditable}
              placeholder="Descriptions"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.descriptions || ""}
              invalid={
                validation.touched.descriptions && validation.errors.descriptions
                  ? true
                  : false
              }
            />
            {validation.touched.descriptions &&
            validation.errors.descriptions ? (
              <FormFeedback type="invalid">
                {validation.errors.descriptions}
              </FormFeedback>
            ) : null}
          </Col>
        </Row>
      </Form>
      <BoardAll
        ref={refBoard}
        columns={columns}
        rows={roles || []}
        component={List}
        isEditable={isEditable}
        checkbox
      />
    </div>
  );
}

export default forwardRef(PositionCommonForm);

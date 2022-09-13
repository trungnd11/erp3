import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button, Input, Label } from "reactstrap";
import Select from "react-select";
import Modal from "../../../../Components/Modal";

const stageOptions = [
  { label: "Giai đoạn 1", value: "Giai đoạn 1" },
  { label: "Giai đoạn 2", value: "Giai đoạn 2" },
  { label: "Giai đoạn 3", value: "Giai đoạn 3" },
  { label: "Giai đoạn 4", value: "Giai đoạn 4" },
];

const comparisonOptions = [
  { label: "=", value: "EQUAL" },
  { label: ">", value: "GREATER_THAN" },
  { label: ">=", value: "GREATER_THAN_EQUAL" },
  { label: "<", value: "LESS_THAN" },
  { label: "<=", value: "LESS_THAN_EQUAL" },
];

const SaveAction = (props) => {
  const { onSave } = props;
  return (
    <React.Fragment>
      <Button color="primary" onClick={onSave}>
        OK
      </Button>
    </React.Fragment>
  );
};

function ActionTranferModal(
  { callback = () => {}, actions, conditionTranfer, setConditionTranfer },
  ref
) {
  const tranferModal = useRef();
  const options = useMemo(() => {
    let rs = [];
    actions.forEach((item) => {
      const tmp = item.form.map((el) => ({
        group: item.name,
        field_name: el.field_name,
        label: el.label,
        value: el.label,
        type: el.element,
        optionsValue: el.options ? el.options : null,
      }));
      rs = rs.concat(tmp);
    });
    return rs;
  }, [actions]);

  const [selectedField, setSelectedField] = useState();
  const [selectedComparison, setSelectedComparison] = useState();
  const [inputValue, setInputValue] = useState();
  const [selectedStage, setSelectedStage] = useState();

  useImperativeHandle(
    ref,
    () => {
      return {
        openModal: () => {
          tranferModal.current.setOpen(true);
        },
      };
    },
    []
  );

  const handleChangeField = (option) => {
    setSelectedField(option);
  };

  const handleChangeInputValue = (option) => {
    setInputValue(option);
  };

  const handleChangeComparison = (option) => {
    setSelectedComparison(option);
  }

  const handleChangeSelectedStage = (option) => {
    setSelectedStage(option);
  };

  const onSave = () => {
    const c = {field: selectedField, comparison: selectedComparison, result: inputValue, tranferStage: selectedStage};
    console.log(conditionTranfer);
    // setConditionTranfer(pre => ([...pre, conditionTranfer]))
    const conditions = [...conditionTranfer];
    const targetGroup = conditions.find(el => el.group === c.field.group)
    console.log(targetGroup);
    if(targetGroup){
      targetGroup.actions.push(c);
    }
    else{
      conditions.push({group: c.field.group, actions: [c]})
    }
    setConditionTranfer(conditions);
    setInputValue(null);
    setSelectedField(null);
    setSelectedStage(null);
    tranferModal.current.setOpen(false);
    callback();
  };

  return (
    <>
      <Modal
        ref={tranferModal}
        title="Add Action Tranfer"
        onCloseCallback={() => {
          callback();
        }}
        action={<SaveAction onSave={onSave} />}
      >
        <div className="d-flex">
          <div className="flex-grow-1">
            <Label htmlFor="action" className="form-label">
              Field
            </Label>
            <Select
              value={selectedField}
              onChange={(option) => {
                handleChangeField(option);
              }}
              options={options}
              getOptionLabel={(option) => `${option.label}`}
            />
          </div>
          <div>
            <Label htmlFor="compare" className="form-label">
              Comparison
            </Label>
            <Select
              options={comparisonOptions}
              value={selectedComparison}
              onChange={handleChangeComparison}
              getOptionLabel={(option) => `${option.label}`}
            />
          </div>
          <div className="flex-grow-1">
            <Label htmlFor="val" className="form-label">
              Result
            </Label>
            {selectedField && selectedField.optionsValue ? (
              <Select
                value={inputValue}
                onChange={(option) => {
                  handleChangeInputValue(option);
                }}
                options={selectedField.optionsValue}
                getOptionLabel={(option) => `${option.text}`}
              />
            ) : (
              <Input />
            )}
          </div>
        </div>
        <div className="gap-2 mt-3">
          <Label htmlFor="stage" className="form-label">
            Tranfer to stage
          </Label>
          <Select
            value={selectedStage}
            options={stageOptions}
            getOptionLabel={(option) => option.label}
            onChange={handleChangeSelectedStage}
          />
        </div>
      </Modal>
    </>
  );
}

export default forwardRef(ActionTranferModal);

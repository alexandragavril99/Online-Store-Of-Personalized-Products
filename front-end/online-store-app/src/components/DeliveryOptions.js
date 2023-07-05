import { Button } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Typography from "@mui/material/Typography";
import { withStyles } from "@mui/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  section: {
    width: "400px",
    textAlign: "left",
    margin: "0 auto",
    marginTop: "3%",
    fontFamily: "'Montserrat', sans-serif",
  },

  radioButtonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
};

const CustomRadio = withStyles({
  root: {
    color: "#9a044c", // Set your desired color here
    "&$checked": {
      color: "#9a044c", // Set the checked color here (if different)
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

function DeliveryOptions(props) {
  const handleContinueButton = () => {
    props.onChangeStep({
      step: 2,
    });
  };

  const [deliveryMethod, setDeliveryMethod] = useState("Home delivery");
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(sessionStorage.getItem("totalPrice"));
    setTotalPrice(Number(sessionStorage.getItem("totalPrice")));
  });

  return (
    <>
      <div
        className="radio-buttons-container container"
        style={{ fontFamily: "'Montserrat', sans-serif", marginTop: "6%" }}
      >
        <div className="row">
          <div className="col-sm">
            <h4 htmlFor="delivery-method">Delivery method</h4>
            <div style={styles.section}>
              <div style={styles.radioButtonContainer}>
                <div className="form-check" style={{ padding: "5px" }}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="delivery-method"
                    id="flexRadioDefault1"
                    value="Home delivery"
                    style={{ borderColor: "#9a044c" }}
                    checked
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Home delivery
                  </label>
                </div>
                <div style={{ fontStyle: "italic" }}>free</div>
              </div>
              <div style={styles.radioButtonContainer}>
                <div className="form-check" style={{ padding: "5px" }}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="delivery-method"
                    id="flexRadioDefault2"
                    value="Personal pickup from the store"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Personal pickup from the store
                  </label>
                </div>
                <div style={{ fontStyle: "italic" }}>free</div>
              </div>
            </div>
            {/* <FormControl
              style={{
                marginBottom: "15px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={deliveryMethod}
                onChange={(event) => setDeliveryMethod(event.target.value)}
              >
                <FormControlLabel
                  value="Home delivery"
                  control={<CustomRadio />}
                  label="Home delivery"
                />
                <FormControlLabel
                  value="Personal pickup from the store"
                  control={<CustomRadio />}
                  label="Personal pickup from the store"
                />
              </RadioGroup>
            </FormControl> */}
          </div>
          <div className="col-sm">
            <h4 htmlFor="payment-method">Payment method</h4>
            <div style={styles.section}>
              <div style={styles.radioButtonContainer}>
                <div class="form-check" style={{ padding: "5px" }}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="payment-method"
                    id="flexRadioDefault3"
                    checked
                    value="Payment by bank card"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault3"
                  >
                    Payment by bank card
                  </label>
                </div>
                <div>
                  <CreditCardIcon style={{ color: "#d98bad" }} />
                </div>
              </div>

              <div style={styles.radioButtonContainer}>
                <div className="form-check" style={{ padding: "5px" }}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="payment-method"
                    id="flexRadioDefault4"
                    value="Cash on delivery"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault4"
                  >
                    Cash on delivery
                  </label>
                </div>
                <div style={{ fontStyle: "italic" }}>3 RON</div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            background: "#f8f9fa",
            height: "50px",
            alignItems: "center",
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "5%",
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          <div>
            Products price:{" "}
            <label style={{ fontWeight: "600" }}>
              {totalPrice.toFixed(2)} RON
            </label>{" "}
            + Delivery method: <label style={{ fontWeight: "600" }}>free</label>{" "}
            + Payment method: <label style={{ fontWeight: "600" }}>free</label>{" "}
            ={" "}
            <label style={{ fontWeight: "600" }}>
              {totalPrice.toFixed(2)} RON
            </label>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "3%",
          }}
        >
          <Button
            variant="contained"
            style={{ background: "#9a044c" }}
            onClick={() => navigate("/home")}
          >
            Back to shopping
          </Button>
          <Button
            variant="contained"
            style={{ background: "#9a044c" }}
            onClick={() => handleContinueButton()}
          >
            Continue
          </Button>
        </div>
      </div>
    </>
  );
}

export default DeliveryOptions;

import { Button } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Typography from "@mui/material/Typography";

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
function DeliveryOptions(props) {
  const handleContinueButton = () => {
    props.onChangeStep({
      step: 2,
    });
  };
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
            <label style={{ fontWeight: "600" }}> 264.54 RON </label> + Delivery
            method: <label style={{ fontWeight: "600" }}>free</label> + Payment
            method: <label style={{ fontWeight: "600" }}>free</label> ={" "}
            <label style={{ fontWeight: "600" }}> 264.54 RON</label>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "3%",
          }}
        >
          <Button variant="contained" style={{ background: "#9a044c" }}>
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

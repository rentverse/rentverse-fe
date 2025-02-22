import { Container, Table } from "react-bootstrap";
import { HiMagnifyingGlassCircle } from "react-icons/hi2";
import { useState } from "react";
import Approvement from "../component/Approvement";
import { useQuery } from "react-query";
import { API } from "../config/api";
import moment from "moment-timezone";

const ListTransaction = () => {
  const [showApprovement, setShowApprovement] = useState(false);
  // const [showImg, setShowImg] = useState(false);
  // const [currentImgUrl, setCurrentImgUrl] = useState("");
  const [currentTransaction, setCurrentTransaction] = useState(null);

  const { data: allTransaction, refetch: refetchTransaction } = useQuery(
    "allTransactionCache",
    async () => {
      try {
        const response = await API.get("/transactions/in");

        return response.data.data;
      } catch (e) {
        console.log(e);
      }
    }
  );

  return (
    <main
      style={{ backgroundColor: "#E5E5E5", marginTop: 100, marginBottom: 54 }}
      className="py-5 position-relative"
    >
      {currentTransaction && (
        <Approvement
          showApprovement={showApprovement}
          setShowApprovement={setShowApprovement}
          currentTransaction={currentTransaction}
          refetchTransaction={refetchTransaction}
        />
      )}

      <Container>
        <h1>Incoming Transaction</h1>
        <Table striped className="bg-light mt-4">
          <thead>
            <tr>
              <th className="py-3 text-start">
                {" "}
                <p className="ms-5 ps-5 p-0 m-0">Transaction Number</p>
              </th>
              <th className="py-3 text-center">Users</th>
              <th className="py-3 text-center">Item</th>
              <th className="py-3 text-center">Start</th>
              <th className="py-3 text-center">End</th>
              {/* <th className="py-3 text-center">Bukti Transfer</th> */}
              <th className="py-3 text-center">Status</th>
              <th className="py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {allTransaction?.map((trx) => {
              return (
                <tr key={trx.id}>
                  <td>{trx.transaction_number.toUpperCase()}</td>
                  <td className="text-center">{trx.user?.name}</td>
                  <td className="text-center">{trx.item?.name}</td>
                  <td className="text-center">
                    {moment
                      .tz(trx.start, "Asia/Jakarta")
                      .format("DD MMMM YYY (HH:mm)")}
                  </td>
                  <td className="text-center">
                    {moment
                      .tz(trx.end, "Asia/Jakarta")
                      .format("DD MMMM YYY (HH:mm)")}
                  </td>
                  {/* <td className="text-center">-</td> */}
                  <td
                    className={`text-center fw-bold 
                    ${
                      trx.transaction_status.status === "New" &&
                      "text-secondary"
                    }
                    ${
                      trx.transaction_status.status === "Cancel" &&
                      "text-warning"
                    }
                    ${
                      trx.transaction_status.status === "Booked" &&
                      "text-success"
                    }
                    ${
                      trx.transaction_status.status === "On Going" &&
                      "text-success"
                    }
                    ${
                      trx.transaction_status.status === "Closed" &&
                      "text-success"
                    }
                    ${
                      trx.transaction_status.status === "Rejected" &&
                      "text-danger"
                    }
                    `}
                  >
                    {trx.transaction_status.status.toUpperCase()}
                  </td>
                  <td className="text-center">
                    <HiMagnifyingGlassCircle
                      className="fs-2 text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setCurrentTransaction(trx);
                        setShowApprovement(true);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </main>
  );
};

export default ListTransaction;

import { toast } from "@/components/ui/use-toast";
import { FaCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx"

/**
 * @description failed toast message
 */
export const showFailedMessage = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  toast({
    description: (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
          fontWeight: "bold",
          fontSize: "1rem",
        }}
      >
        <RxCrossCircled
          style={{
            marginRight: "1rem",
            height: "40px",
            width: "40px",
          }}
          color="FF0000"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.2rem",
          }}
        >
          <p style={{ marginRight: "0.5rem" }}>Transaction Failed</p>
          <p
            style={{
              fontSize: "0.75rem",
              color: "000",
            }}
          >
            {title
              ? title
              : "Your Transaction has failed due to some error. Please try again later."}
          </p>
        </div>
      </div>
    ),
  });
};

/**
 * @description success toast message
 */
export const showSuccessMessage = ({
    title,
    description,
  }: {
    title: string;
    description?: string;
  }) => {
    toast({
      description: (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          <FaCheckCircle
            style={{
              marginRight: "1rem",
              height: "40px",
              width: "40px",
            }}
            color="0BDA51"
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.2rem",
            }}
          >
            <p style={{ marginRight: "0.5rem" }}>Transaction Submitted</p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "000",
              }}
            >
              {title
                ? title
                : "Your Transaction was submitted succesfully"}
            </p>
          </div>
        </div>
      ),
    });
  };
  
  
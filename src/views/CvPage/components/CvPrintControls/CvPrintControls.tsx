"use client";

import {
  createContext,
  type ReactElement,
  type ReactNode,
  type SubmitEvent,
  useContext,
  useState,
} from "react";

import st from "./CvPrintControls.module.css";

interface CvPrintControlsProps {
  children: ReactNode;
}

const CvPhoneNumberContext = createContext<string>("");
const defaultPhonePrefix = "+351 9";

export const useCvPhoneNumber = (): string => {
  return useContext(CvPhoneNumberContext);
};

export const CvPrintControls = ({
  children,
}: CvPrintControlsProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(defaultPhonePrefix);
  const printablePhoneNumber =
    phoneNumber === defaultPhonePrefix ? "" : phoneNumber.trim();

  const handlePrint = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();
    window.print();
  };

  return (
    <CvPhoneNumberContext.Provider value={printablePhoneNumber}>
      <div className={st.root}>
        <button
          className={st.trigger}
          onClick={() => setIsOpen(true)}
          type="button"
        >
          Prepare PDF
        </button>

        {isOpen && (
          <div className={st.backdrop} role="presentation">
            <form
              aria-label="Prepare resume PDF"
              aria-modal="true"
              className={st.modal}
              onSubmit={handlePrint}
              role="dialog"
            >
              <label className={st.label} htmlFor="cv-phone-number">
                Phone number for this PDF
              </label>
              <input
                autoComplete="off"
                autoFocus
                className={st.input}
                id="cv-phone-number"
                inputMode="tel"
                onChange={(event) => setPhoneNumber(event.currentTarget.value)}
                placeholder="+351 9XX XXX XXX"
                type="tel"
                value={phoneNumber}
              />
              <div className={st.actions}>
                <button
                  className={st.cancelButton}
                  onClick={() => setIsOpen(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button className={st.printButton} type="submit">
                  Print / save PDF
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      {children}
    </CvPhoneNumberContext.Provider>
  );
};

/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { Button } from "../../elements";
import { savedButtonText, savingButtonText } from "../../constants";
import { savingButton } from "./style";

interface HeaderProps {
  diagram: go.Diagram;
}

const Header = ({ diagram }: HeaderProps) => {
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    if (!diagram) return;

    diagram.addModelChangedListener((e) => {
      if (e.isTransactionFinished) {
        setIsSaving(true);
        setTimeout(() => {
          setIsSaving(false);
        }, 5000);
      }
    });
  }, [diagram]);

  return (
    <>
      <Button
        styleClass={savingButton(isSaving)}
        text={isSaving ? savingButtonText : savedButtonText}
      />
    </>
  );
};

export default Header;

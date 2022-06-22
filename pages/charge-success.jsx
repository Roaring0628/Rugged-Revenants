/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import NextImage from "next/image";
import Link from "next/link";

export default function Home() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [oldCharges, setOldCharges] = useState(0);
  const [newCharges, setNewCharges] = useState(0);

  useEffect(() => {
    const oldCharges = Number(localStorage.getItem("old-charges") || 0);
    const newCharges = Number(localStorage.getItem("new-charges") || 0); // for test purpose + 1
    localStorage.removeItem("old-charges");
    localStorage.removeItem("new-charges");

    setOldCharges(oldCharges);
    setNewCharges(newCharges);

    if (newCharges > oldCharges) {
      setTimeout(() => {
        setShowSuccess(true);
      }, 3500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="w-full relative">
      <div className="h-[100vh] w-full relative">
        <img
          src="/media/charge-success/ui_charge_bglines.png"
          alt="charge back"
          className="absolute bottom-0 w-full object-cover object-top"
        />
        <div className="absolute w-56 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10">
          <div className="w-full relative">
            <img
              src="/media/charge-success/rugged-revenants_incubator.gif"
              alt="charge animation"
              className="w-full relative z-10"
            />
            <img
              src="/media/charge-success/ui_charge_incubatorshadow.png"
              className="absolute bottom-0 w-full"
              alt="incubator shadow"
            />
          </div>
          <p className="text-center text-[0.6rem] tracking-tighter">
            Current Charges : {oldCharges}
          </p>
        </div>
        {showSuccess && (
          <div className="absolute w-[26rem] sm:w-[40rem] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20 fade-in-normal">
            <div className="w-full mb-6">
              <img
                className="w-full"
                src="/media/charge-success/ui_charge_success.png"
                alt="charge success"
              />
            </div>
            <div className="relative w-[22rem] sm:w-[26rem] h-32 sm:h-36 mx-auto flex justify-center items-center">
              <img
                className="absolute top-0 left-0 w-full h-full"
                src="/media/charge-success/ui_charge_button.png"
                alt="button"
              ></img>
              <p className="z-10 relative text-base text-center tracking-tighter">
                <span className="block mb-3">You currently have</span>
                <span className="block text-lg">{newCharges} Charges</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

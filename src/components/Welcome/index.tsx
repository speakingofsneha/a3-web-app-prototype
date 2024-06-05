import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "@components/Button";
import LordIcon from "@components/LordIcon";
import useOnClickOutside from "@hooks/useOnClickOutside";
import { local } from "@services/storage";
import { setUser } from "@store/modules/user/actions";
import { useDispatch } from "react-redux";

function Welcome() {
  const dispatch = useDispatch();

  const [animatingDown, setAnimatingDown] = useState(true);
  const [animatingLeft, setAnimatingLeft] = useState(false);
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dialogRef.current) return;
    if (dialogRef.current.open) return;
    dialogRef.current.showModal();
  }, []);

  const closeModal = useCallback(() => {
    if (!dialogRef.current) return;
    if (!dialogRef.current.open) return;
    dialogRef.current.close();
  }, [dialogRef]);

  const handleStep = useCallback(
    (step: number) => {
      setAnimatingLeft(true);

      setTimeout(() => {
        setAnimatingLeft(false);
        setAnimatingDown(true);
        setStep(step);
      }, 250);

      setTimeout(() => {
        setAnimatingDown(false);
      }, 500);
    },
    [setAnimatingDown, setStep]
  );

  const handleWelcome = useCallback(() => {
    dispatch(setUser({ username }));
    local.set("user", JSON.stringify({ username }));

    closeModal();
  }, [dispatch, username, closeModal]);

  const steps = [
    {
      image: (
        <img
          src="src/components/Assets/star.svg" 
          height={120}
          width={120}
          className={`${
            animatingDown
              ? "animate-slide-welcome-down"
              : animatingLeft
              ? "animate-slide-welcome-left"
              : ""
          }`}
        />
      ),

      key: 1,
      subtitle: "Your task manager focused on simplicty and delight",
      title: "Welcome to Anu",
    },
    {
      image: (
        <img
          src="src/components/Assets/list.svg" 
          height={120}
          width={120}
          className={`${
            animatingDown
              ? "animate-slide-welcome-down"
              : animatingLeft
              ? "animate-slide-welcome-left"
              : ""
          }`}
        />
      ),

      key: 2,
      subtitle: "Where all your tasks finally coexist, in a single source of truth while being organised",
      title: "Intuitive, Customizable Lists",
    },
    {
      image: (
        <img
          src="src/components/Assets/sparkle.svg" 
          height={120}
          width={120}
          className={` ${
            animatingDown
              ? "animate-slide-welcome-down"
              : animatingLeft
              ? "animate-slide-welcome-left"
              : ""
          }`}
        />
      ),
      key: 3,
      subtitle: "The no nonsense, back-to-basics todo list you’ve been longing for.",
      title: "Reach Mental Clarity",
    },
    {
      image: (
        <img
          src="src/components/Assets/smile.svg" 
          height={120}
          width={120}
          className={` ${
            animatingDown
              ? "animate-slide-welcome-down"
              : animatingLeft
              ? "animate-slide-welcome-left"
              : ""
          }`}
        />
      ),
      key: 4,
      title: "What is your name?",
    },
  ];

  useOnClickOutside(dialogContentRef, () => closeModal());

  return createPortal(
    <dialog
      aria-labelledby={"Welcome."}
      aria-modal
      ref={dialogRef}
      className="m-auto rounded-2xl bg-white outline-none backdrop:bg-black/50"
    >
      <div
        ref={dialogContentRef}
        className="flex h-[calc(100vh-48px)] w-[calc(100vw-48px)] flex-shrink-0 flex-col justify-end gap-8 rounded-2xl bg-gradient-to-b from-primary/25 to-#FCFBF8 p-8 sm:h-[465px] sm:w-96"
      >
        {steps[step - 1].image && (
          <div className="relative grid h-full w-full place-items-center border-b border-black/5">
            {step === 1 ? (
              <div
                onAnimationEnd={() => {
                  setAnimatingDown(false);
                  setAnimatingLeft(false);
                }}
                className={`absolute grid place-items-center rounded-2xl bg-white p-7 ${
                  animatingDown
                    ? "animate-slide-welcome-down"
                    : animatingLeft
                    ? "animate-slide-welcome-left"
                    : ""
                }`}
              >
                {steps[step - 1].image}
              </div>
            ) : (
              steps[step - 1].image
            )}
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-text">
            {steps[step - 1].title}
          </span>
          {step === 4 ? (
            <input
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleWelcome();
                }
              }}
              placeholder="type here"
              type="text"
              value={username}
              className="bg-transparent p-1 text-base text-text outline-none" 
            />
          ) : (
            <p className="p-1 text-base text-text/50">
              {steps[step - 1].subtitle}
            </p>
          )}
        </div>
        <Button
          disabled={(step === 4 && !username) || animatingDown || animatingLeft}
          icon={
            <LordIcon
              src="https://cdn.lordicon.com/zmkotitn.json"
              trigger="hover"
              colors={{ primary: "#808080" }}
              size={20}
            />
          }
          onClick={() => (step === 4 ? handleWelcome() : handleStep(step + 1))}
          style={{ marginLeft: 'auto', display: 'flex', justifyContent: 'center' }}
        />
        <div className="mx-auto flex w-fit items-center gap-2">
          {steps.map((s) => (
            <span
              key={s.key}
              className={`h-2 w-2 rounded-full transition-colors ${
                step >= s.key ? "bg-primary" : "bg-black/5"
              }`}
            />
          ))}
        </div>
      </div>
    </dialog>,
    document.body
  );
}

export default Welcome;

const body = document.querySelector("body");
let calc;
let modal;
let cancel;
let confirm;

const createCalc = () => {
  calc = document.createElement("div");
  calc.classList.add("calc");
  calc.addEventListener("click", () => {
    calc.remove();
  });
};

const createModal = (question) => {
  modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
      <p>${question}</p>
    `;
  cancel = document.createElement("button");
  cancel.innerText = "Annuler";
  cancel.classList.add("btn", "btn-secondary");
  confirm = document.createElement("button");
  confirm.classList.add("btn", "btn-primary");
  confirm.innerText = "Confirmer";
  // Nous empêchons la propagation de l’événement pour
  // que la modale ne se ferme pas lorsque l’on clique dessus :
  modal.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  modal.append(cancel, confirm);
};

export function openModal(question) {
  createCalc();
  createModal(question);
  calc.append(modal);
  body.append(calc);

  // Nous retournons une nouvelle promesse qui sera tenue
  // lorsque l’utilisateur cliquera.
  // Soit il clique sur le calque ou annuler et la promesse sera résolue avec false.
  // Soit il clique sur confirmer et la promesse sera résolue avec true.

  return new Promise((resolve, reject) => {
    calc.addEventListener("click", () => {
      resolve(false);
      calc.remove();
    });

    cancel.addEventListener("click", () => {
      resolve(false);
      calc.remove();
    });

    confirm.addEventListener("click", () => {
      resolve(true);
      calc.remove();
    });
  });
}

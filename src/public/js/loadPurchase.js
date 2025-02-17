const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const loadPurchases = async () => {
  try {
    const token = getCookie("token");
    console.log("Token:", token);

    if (!token) {
      alert("Token de autenticação não encontrado.");
      return;
    }

    const response = await fetch("/api/purchases", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Erro ao carregar compras");
    }

    const purchases = await response.json();
    const purchasesList = document.getElementById("purchasesList");
    purchasesList.innerHTML = "";

    if (purchases.length > 0) {
      purchases.forEach((purchase) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
          <a href="/ticket/${purchase.id}">Ingresso ${purchase.ticketName}</a>
          <p>Quantidade: ${purchase.quantity}</p>
          <p>Preço: R$ ${purchase.ticketPrice.toFixed(2)}</p>
        `;
        purchasesList.appendChild(listItem);
      });
    } else {
      purchasesList.innerHTML = "<p>Nenhuma compra encontrada.</p>";
    }
  } catch (error) {
    console.error("Erro ao carregar compras:", error);
    alert("Erro ao carregar compras. Verifique o console para mais detalhes.");
  }
};

window.addEventListener("load", loadPurchases);

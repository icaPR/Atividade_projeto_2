const loadTicketDetails = async (ticketId) => {
  try {
    const token = getCookie("token");
    console.log("Token:", token);

    const response = await fetch(`/api/purchases/${ticketId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Erro ao carregar ingresso");
    }

    const data = await response.json();
    const ticketDetails = document.getElementById("ticketDetails");
    ticketDetails.innerHTML = `
      <p>Nome: ${data.ticketName}</p>
      <p>Preço: R$ ${data.ticketPrice}</p>
      <p>Quantidade: ${data.quantity}</p>
    `;
  } catch (error) {
    console.error("Erro ao carregar ingresso:", error);
  }
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const pathParts = window.location.pathname.split("/");
const ticketId = pathParts[pathParts.length - 1];

if (ticketId) {
  loadTicketDetails(ticketId);
} else {
  console.error("ticketId não encontrado na URL.");
}

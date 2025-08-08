$(document).ready(function () {
  $("#mobile--btn").on("click", function () {
    $("#mobile--menu").toggleClass("active");
    $("#mobile--btn").find("i").toggleClass("bi bi-x");
  });

  const sections = $("section");
  const navItems = $(".nav--item");

  $(window).on("scroll", function () {
    const header = $("header");
    const scrollPosition = $(window).scrollTop() - header.outerHeight();

    let activeSectionIndex = 0;

    if (scrollPosition <= 0) {
      header.css("box-shadow", "none");
    } else {
      header.css("box-shadow", "5px 1px 5px rgba(0, 0, 0, 0.1)");
    }

    sections.each(function (i) {
      const section = $(this);
      const sectionTop = section.offset().top - 150;
      const sectionBottom = sectionTop + section.outerHeight();

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        activeSectionIndex = i;
        return false;
      }
    });

    navItems.removeClass("active");
    $(navItems[activeSectionIndex]).addClass("active");
  });

  ScrollReveal().reveal("#cta", {
    origin: "left",
    duration: 2000,
    distance: "20%",
  });

  ScrollReveal().reveal("#section-text--aboutTheClinic", {
    origin: "left",
    duration: 2000,
    distance: "20%",
  });

  ScrollReveal().reveal(".image-AbouTheClinic", {
    origin: "right",
    duration: 2000,
    distance: "20%",
  });

  ScrollReveal().reveal(".service", {
    origin: "bottom",
    distance: "50px",
    duration: 800,
    interval: 100,
    reset: false,
  });

  ScrollReveal().reveal("#testimonials-physical-therapist", {
    origin: "left",
    duration: 1000,
    distance: "20%",
  });

  ScrollReveal().reveal("#section-text--testimonials", {
    origin: "right",
    duration: 1000,
    distance: "20%",
  });

  ScrollReveal().reveal("#contact", {
    origin: "bottom",
    distance: "50px",
    duration: 800,
    distance: "20%",
  });
});

// const form = document.querySelector(".form--contact");

// if (form) {
//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const data = {
//       nome: form.nome.value,
//       email: form.email.value,
//       telefone: form.telefone.value,
//       mensagem: form.mensagem.value,
//     };

//     try {
//       const resp = await fetch(
//         "https://landing-page-clinica-de-posturologia-e.onrender.com/api/contact",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(data),
//         }
//       );

//       const json = await resp.json();
//       if (!resp.ok) throw new Error(json.error || "Erro");
//       alert("Mensagem enviada. Obrigado!");
//       form.reset();
//     } catch (err) {
//       alert("Erro ao enviar: " + err.message);
//     }
//   });
// }

const form = document.querySelector(".form--contact");
const errorMsg = document.createElement("p");
errorMsg.style.color = "red";
form.appendChild(errorMsg);

form.addEventListener("submit", async function (event) {
  event.preventDefault(); // evita o envio padrão

  // Pega os valores e limpa espaços
  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const telefone = form.telefone.value.trim();
  const mensagem = form.mensagem.value.trim();

  errorMsg.textContent = ""; // limpa mensagem anterior

  // Validação simples
  if (!nome || !email || !mensagem) {
    errorMsg.textContent = "Preencha nome, email e mensagem.";
    return;
  }

  // Regex para validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errorMsg.textContent = "Email inválido.";
    return;
  }

  // Se quiser, valida telefone aqui (opcional)

  // Monta o objeto para enviar
  const data = { nome, email, telefone, mensagem };

  try {
    const response = await fetch("http://localhost:10000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro no envio");
    }

    const resData = await response.json();
    alert(resData.message); // mensagem de sucesso
    form.reset(); // limpa o formulário
    errorMsg.textContent = "";
  } catch (err) {
    errorMsg.textContent = err.message || "Erro ao enviar, tente novamente.";
    console.error(err);
  }
});

import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useCart } from "./CartContext";

const ChatbotPage = () => {
    const [messages, setMessages] = useState([]); // Poruke između korisnika i bota
    const [userInput, setUserInput] = useState(""); // Tekst korisnika
    const [isLoading, setIsLoading] = useState(false); // Indikator učitavanja

    const { addToCart } = useCart(); // Funkcija za dodavanje ljubimaca u korpu
    useEffect(() => {
        // Dohvati sačuvane poruke iz localStorage
        const savedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
        setMessages(savedMessages);

        // Ako nema poruka, dodaj inicijalnu poruku
        if (savedMessages.length === 0) {
            const initialMessage = {
                sender: "bot",
                text: "Zdravo, ja sam vaš lični asistent i pomoći ću vam da nađete odgovarajućeg ljubimca za Vas.",
            };
            setMessages([initialMessage]);
            localStorage.setItem("chatMessages", JSON.stringify([initialMessage]));
        }
    }, []);

    const sendMessageToAPI = async (message) => {
        try {
            const apiKey = "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"; // Zameni svojim OpenAI API ključem
            const pets = JSON.parse(localStorage.getItem("pets")) || []; // Dohvati ljubimce iz localStorage
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-4o-mini",
                    messages: [
                        {
                            role: "system",
                            content:
                                "Ti si chatbot za prodavnicu ljubimaca. Imaš pristup listi ljubimaca iz `localStorage`. Preporuči ljubimce na osnovu korisničkih zahteva i ne izbacuj formatirane detalje ili linkove ka slikama. Ako korisnik želi, dodaj ljubimca u korpu koristeći kontekst.",
                        },
                        { role: "system", content: `Dostupni ljubimci: ${JSON.stringify(pets)}` },
                        { role: "user", content: message },
                    ],
                },
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data.choices[0].message.content; // Odgovor bota
        } catch (error) {
            console.error("Greška pri slanju poruke:", error);
            return "Nažalost, trenutno ne mogu da odgovorim na vaše pitanje.";
        }
    };

    const handleSendMessage = async () => {
        if (!userInput.trim()) return;

        const userMessage = { sender: "user", text: userInput };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
        setUserInput("");
        setIsLoading(true);

        const botResponse = await sendMessageToAPI(userInput);

        // Obrada specifičnih odgovora bota
        if (botResponse.toLowerCase().includes("dodao") || botResponse.toLowerCase().includes("dodat")) {
            const pets = JSON.parse(localStorage.getItem("pets")) || [];
            const pet = pets.find((p) => botResponse.toLowerCase().includes(p.name.toLowerCase()));
            if (pet) {
                addToCart(pet); // Dodaj ljubimca u korpu
                const updatedWithBotMessage = [
                    ...updatedMessages,
                    { sender: "bot", text: `Ljubimac ${pet.name} je dodat u vašu korpu.` },
                ];
                setMessages(updatedWithBotMessage);
                localStorage.setItem("chatMessages", JSON.stringify(updatedWithBotMessage));
                setIsLoading(false);
                return;
            }
        }

        // Generički odgovor bota
        const updatedWithBotMessage = [...updatedMessages, { sender: "bot", text: botResponse }];
        setMessages(updatedWithBotMessage);
        localStorage.setItem("chatMessages", JSON.stringify(updatedWithBotMessage));
        setIsLoading(false);
    };

    return (
        <Box
            sx={{
                height: '600px',
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#f9f9f9",
                margin: "auto",
            }}
        >
            <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                Asistent za kupovinu
            </Typography>
            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: "scroll",
                    marginBottom: "10px",
                    padding: "10px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                }}
            >
                {messages.map((msg, index) => {
                    const formatMessage = (text) => {
                        // Zameni "**rec**" sa HTML oznakom za boldovanje
                        const boldedText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
                        return boldedText;
                    };

                    return (
                        <Box
                            key={index}
                            sx={{
                                textAlign: msg.sender === "user" ? "right" : "left",
                                marginBottom: "10px",
                            }}
                        >
                            <Typography
                                sx={{
                                    display: "inline-block",
                                    backgroundColor: msg.sender === "user" ? "#007bff" : "#f1f1f1",
                                    color: msg.sender === "user" ? "#fff" : "#000",
                                    padding: "8px 12px",
                                    borderRadius: "10px",
                                    maxWidth: "80%",
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: formatMessage(msg.text),
                                }}
                            ></Typography>
                        </Box>
                    );
                })}

            </Box>
            <Box sx={{ display: "flex", gap: "10px" }}>
                <TextField
                    fullWidth
                    placeholder="Unesite poruku..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    disabled={isLoading}
                />
                <Button variant="contained" onClick={handleSendMessage} disabled={isLoading}>
                    {isLoading ? "Šalje se..." : "Pošalji"}
                </Button>
            </Box>
        </Box>
    );
};

export default ChatbotPage;

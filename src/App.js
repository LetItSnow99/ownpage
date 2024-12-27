import React, { useState, useEffect } from "react";

function App() {
    const [slots, setSlots] = useState([
        { top: "13%", left: "47%", decoration: null, color: null },
        { top: "30%", left: "40%", decoration: null, color: null },
        { top: "30%", left: "50%", decoration: null, color: null },
        { top: "45%", left: "35%", decoration: null, color: null },
        { top: "45%", left: "50%", decoration: null, color: null },
        { top: "60%", left: "30%", decoration: null, color: null },
        { top: "60%", left: "50%", decoration: null, color: null },
        { top: "75%", left: "65%", decoration: null, color: null },
        { top: "75%", left: "45%", decoration: null, color: null },
        { top: "81%", left: "30%", decoration: null, color: null },
        { top: "10%", left: "50%", isLight: true, color: "red" },
        { top: "20%", left: "45%", isLight: true, color: "yellow" },
        { top: "20%", left: "53%", isLight: true, color: "green" },
        { top: "28%", left: "45%", isLight: true, color: "blue" },
        { top: "27%", left: "52%", isLight: true, color: "pink" },
        { top: "40%", left: "43%", isLight: true, color: "violet" },
        { top: "40%", left: "55%", isLight: true, color: "red" },
        { top: "53%", left: "40%", isLight: true, color: "yellow" },
        { top: "55%", left: "55%", isLight: true, color: "green" },
        { top: "60%", left: "40%", isLight: true, color: "blue" },
        { top: "60%", left: "60%", isLight: true, color: "pink" },
        { top: "70%", left: "35%", isLight: true, color: "violet" },
        { top: "70%", left: "65%", isLight: true, color: "red" },
        { top: "80%", left: "55%", isLight: true, color: "yellow" },
        { top: "87%", left: "45%", isLight: true, color: "green" },
    ]);

    const [isBlinking, setIsBlinking] = useState(false);
    const [lightsOn, setLightsOn] = useState(true);
    const [selectedEmoji, setSelectedEmoji] = useState(null);

    const emojis = ["🎄", "🎁", "❄️", "🎅", "🤶", "☃️", "🦌", "🕯️", "🍪", "🥛"];
    const colors = ["red", "green", "yellow", "blue", "pink", "violet"];

    useEffect(() => {
        let interval;
        if (isBlinking && lightsOn) {
            interval = setInterval(() => {
                setSlots((prevSlots) =>
                    prevSlots.map((slot) =>
                        slot.isLight
                            ? {
                                ...slot,
                                color:
                                    slot.color === "white" || !slot.color
                                        ? "yellow"
                                        : "white",
                            }
                            : slot
                    )
                );
            }, 500);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isBlinking, lightsOn]);

    const toggleLights = () => {
        setLightsOn((prev) => !prev);
        if (!lightsOn) {
            setSlots((prevSlots) =>
                prevSlots.map((slot) =>
                    slot.isLight
                        ? { ...slot, color: slot.color || "yellow" }
                        : slot
                )
            );
        }
    };

    const handleSlotClick = (index) => {
        if (slots[index].isLight || !selectedEmoji) return;
        const newSlots = [...slots];
        newSlots[index].decoration = selectedEmoji;
        setSlots(newSlots);
    };

    const handleColorChange = (color) => {
        const newSlots = slots.map((slot) =>
            slot.isLight ? { ...slot, color } : slot
        );
        setSlots(newSlots);
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundImage:
                    "url('https://wallpaperbat.com/img/8627341-download-a-christmas-scene-with-a.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                padding: "20px",
            }}
        >
            <div style={{ position: "absolute", left: "5%", top: "15%" }}>
                <img
                    src="https://media.istockphoto.com/id/1031974286/vector/on-and-off-toggle-switch-buttons-material-design-switch-buttons-set-vector-illustration.jpg?s=612x612&w=0&k=20&c=JX9tTLwAjbW54SmgmQMGMyOqc9MTb_LO4yuCtGCTyQI="
                    alt="Toggle"
                    onClick={() => setIsBlinking((prev) => !prev)}
                    style={{
                        width: "50px",
                        height: "50px",
                        cursor: "pointer",
                        marginBottom: "20px",
                    }}
                />
                <button
                    onClick={toggleLights}
                    style={{
                        padding: "10px",
                        backgroundColor: lightsOn ? "green" : "red",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        marginBottom: "20px",
                    }}
                >
                    {lightsOn ? "Turn Off" : "Turn On"}
                </button>

                {colors.map((color) => (
                    <div
                        key={color}
                        onClick={() => handleColorChange(color)}
                        style={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: color,
                            marginBottom: "10px",
                            cursor: "pointer",
                            border: "2px solid white",
                        }}
                    ></div>
                ))}
            </div>

            <div
                style={{
                    position: "relative",
                    width: "1200px",
                    height: "1200px",
                    marginLeft: "-500px",
                }}
            >
                <img
                    src="https://frezijadovanos.lt/wp-content/uploads/2022/01/608-33_FL_001.png"
                    alt="Christmas Tree"
                    style={{ width: "100%", height: "100%" }}
                />
                {slots.map((slot, index) => (
                    <div
                        key={index}
                        onClick={() => handleSlotClick(index)}
                        style={{
                            position: "absolute",
                            top: slot.top,
                            left: slot.left,
                            width: slot.isLight ? "20px" : "80px",
                            height: slot.isLight ? "20px" : "80px",
                            borderRadius: "50%",
                            fontSize: slot.isLight ? "12px" : "32px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor:
                                lightsOn && slot.isLight
                                    ? slot.color
                                    : "transparent",
                            border: slot.isLight ? "1px solid gray" : "2px solid red",
                            cursor: slot.isLight ? "default" : "pointer",
                        }}
                    >
                        {slot.decoration && slot.decoration}
                    </div>
                ))}
            </div>

            <div
                style={{
                    marginTop: "30px",
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    transform: "translateX(-500px)",
                }}
            >
                {emojis.map((emoji, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedEmoji(emoji)}
                        style={{
                            fontSize: "40px",
                            cursor: "pointer",
                            border:
                                selectedEmoji === emoji
                                    ? "2px solid black"
                                    : "none",
                            padding: "10px",
                        }}
                    >
                        {emoji}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;

document.getElementById("screenshotBtn").addEventListener("click", async () => {
    const loader = document.getElementById("loader");
    loader.style.display = "block";
  
    try {
      const res = await fetch("/screenshot", { method: "POST" });
      if (!res.ok) throw new Error("Failed");
  
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "infographic.png";
      a.click();
    } catch (err) {
      alert("Error taking screenshot.");
    } finally {
      loader.style.display = "none";
    }
  });
  
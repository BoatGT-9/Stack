const stackContainer = document.getElementById("stack-container");
const block1 = document.querySelector(".block1"); // สมมุติว่า block1 มีคลาส 'block1'
const block2 = document.querySelector(".block2"); // สมมุติว่า block2 มีคลาส 'block2'
const maxStackSize = 6;
const statusMessage = document.getElementById("status-message"); // แก้ไขการสะกดจาก 'status-massage'
const countMessage = document.getElementById("count-message"); // แก้ไขการสะกดจาก 'count-massage'
const positionMessage = document.getElementById("position-message"); // แก้ไขการสะกดจาก 'position-massage'

block1.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData('text/plain', "block1");
});

block2.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData('text/plain', "block2");
});

stackContainer.addEventListener("dragover", (e) => {
    e.preventDefault(); // ป้องกันเหตุการณ์เริ่มต้นเพื่อให้สามารถวางได้
});

stackContainer.addEventListener("drop", (e) => {
    e.preventDefault(); // ป้องกันพฤติกรรมเริ่มต้น
    const data = e.dataTransfer.getData("text/plain");
    if (stackContainer.childElementCount < maxStackSize) {
        if (data === "block1") {
            const newBlock = block1.cloneNode(true); // โคลน block1
            stackContainer.appendChild(newBlock); // เพิ่ม block1
        } else if (data === "block2") {
            const newBlock = block2.cloneNode(true); // โคลน block2
            stackContainer.appendChild(newBlock); // เพิ่ม block2
        }
    }
    updateStatus();
});

stackContainer.addEventListener("dblclick", (e) => {
    if (e.target.classList.contains("block1") || e.target.classList.contains("block2")) {
        stackContainer.removeChild(e.target);
        updateStatus(); // แก้ไขการสะกด
    }
});

function getStackSize() {
    return stackContainer.childElementCount;
}

function updateStatus() {
    const currentStackSize = getStackSize();
    countMessage.textContent = `Count: ${currentStackSize}`;
    if (currentStackSize === 0) {
        statusMessage.textContent = "Stack is empty.";
        positionMessage.textContent = "";
    } else if (currentStackSize === maxStackSize) {
        statusMessage.textContent = "Stack is full.";
    } else {
        positionMessage.textContent = "Positions: ";
        const stackChildren = stackContainer.children;
        for (let i = 0; i < stackChildren.length; i++) {
            const blockType = stackChildren[i].classList.contains("block1") ? "block1" : "block2";
            positionMessage.textContent += `${blockType}(${i + 1}) `;
        }
    }
}

updateStatus();

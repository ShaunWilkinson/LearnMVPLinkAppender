document.addEventListener("DOMContentLoaded", () => {
	const input = document.getElementById("mvpId");

	chrome.storage.sync.get({ mvpId }, (data) => {
		if(data?.mvpId) {
			const dataReturned = Object.keys(data.mvpId).length > 0
			if(dataReturned > 0) {
				input.value = data.mvpId;
			}
		}
	});

	document.getElementById("save").addEventListener("click", () => {
		const mvpId = input.value.trim();
		if (mvpId) {
			chrome.storage.sync.set({ mvpId }, () => {
				alert("MVP ID saved!");
			});
		}
	});
});

(function () {
	'use strict';

	var data = window.PORTFOLIO_DATA || { featuredProjects: [] };
	function dateLabel(isoDate) {
		return new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(isoDate));
	}

	function projectMeta(repository) {
		var card = document.querySelector('[data-project="' + repository.id + '"]');
		if (!card) return;
		var heading = card.querySelector('h2, h3');
		var existing = card.querySelector('.github-meta');
		if (!existing) {
			existing = document.createElement('p');
			existing.className = 'github-meta';
			heading.insertAdjacentElement('afterend', existing);
		}
		existing.innerHTML = 'GitHub: ' + repository.stargazers_count + ' <i class="fas fa-star" aria-hidden="true"></i><span class="visually-hidden">stars</span> · ' + (repository.language || 'Multiple languages') + ' · updated ' + dateLabel(repository.updated_at);
	}

	data.featuredProjects.forEach(function (item) {
		fetch('https://api.github.com/repos/' + data.githubUser + '/' + item.repo, { headers: { Accept: 'application/vnd.github+json' } })
			.then(function (response) { return response.ok ? response.json() : Promise.reject(response.status); })
			.then(function (repository) {
				projectMeta({ id: item.id, stargazers_count: repository.stargazers_count, language: repository.language, updated_at: repository.updated_at });
			})
			.catch(function () { /* Keep authored project content unchanged if GitHub is unavailable. */ });
	});

	var form = document.getElementById('contact-form');
	if (form) {
		var status = document.getElementById('contact-form-status');
		var submitButton = document.getElementById('contact-form-button');
		form.addEventListener('submit', function (event) {
			event.preventDefault();
			if (!form.checkValidity()) { form.reportValidity(); return; }
			if (form.elements.company.value) return;
			submitButton.disabled = true;
			submitButton.textContent = 'Sending…';
			status.textContent = 'Sending your message…';
			fetch(form.action, { method: form.method, body: new FormData(form), headers: { Accept: 'application/json' } })
				.then(function (response) {
					if (!response.ok) throw new Error('Submission failed');
					form.reset();
					status.textContent = 'Thanks — your message has been sent.';
				})
				.catch(function () { status.textContent = 'Your message could not be sent. Please email me directly instead.'; })
				.finally(function () { submitButton.disabled = false; submitButton.textContent = 'Send Message'; });
		});
	}
}());

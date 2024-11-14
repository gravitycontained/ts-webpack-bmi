import { combineLatest } from 'rxjs';
import '../html/style.scss';
import { TitleComponent } from './app/title/title.component';
import { InputComponent } from './control/input/input';
import { OutputComponent } from './app/output/output';
import { round } from './util';

async function main()
{
	const app = document.getElementById("app");
	
	const titleComponent = new TitleComponent();
	const inputHeight = new InputComponent();
	const inputWeight = new InputComponent();
	const outputComponent = new OutputComponent();
	
	inputHeight.setLabel("height (in cm):");
	inputWeight.setLabel("weight (in kg):");
	
	titleComponent.render(app);
	inputHeight.render(app);
	inputWeight.render(app);
	outputComponent.render(app);

	const observables = <const>[
		inputHeight.onInput,
		inputWeight.onInput
	];

	outputComponent.visible.next(false);

	combineLatest(observables).subscribe(values => 
	{
		if (values.some(v => v === ''))
		{
			outputComponent.visible.next(false);
			return;
		}
		outputComponent.visible.next(true);

		const [height, weight] = values.map(v => parseFloat(v));


		const kg = weight;
		const m = (height / 100);
		const result = kg / (m ** 2);
		outputComponent.setOutput(round(result));
	});
}

main();

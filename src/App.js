import { useState } from "react"
import Timer from "./components/Timer"

import { interval } from "rxjs"
import { map } from "rxjs/operators"

const delay = 1000

function App() {
	const [timer, setTimer] = useState(0)
	const [diff, setDiff] = useState(0)

	const [subscription, setSubscription] = useState("")
	const [prevent, setPrevent] = useState(true)

	const onStartHandler = () => {
		if (!subscription) {
			const timerSubscription = interval(delay)
				.pipe(map((v) => v + 1))
				.subscribe((v) => {
					setTimer(v + diff)
				})
			setSubscription(timerSubscription)
		} else {
			subscription.unsubscribe()
			setTimer(0)
			setDiff(0)
			setSubscription("")
		}
	}

	const onWaitHandler = (event) => {
		if (prevent) {
			setPrevent(false)
			const timerInstance = setTimeout(function () {
				setPrevent(true)
				clearTimeout(timerInstance)
			}, 300)
		}
		if (subscription) {
			subscription.unsubscribe()
		}

		setDiff(timer)
		setSubscription("")
	}

	const onResetHandler = () => {
		if (subscription) {
			subscription.unsubscribe()
		}

		const timerSubscription = interval(delay).subscribe((v) => {
			setTimer(v)
		})
		setSubscription(timerSubscription)
	}

	return (
		<div className="App">
			<h1>RxJS Timer</h1>
			<hr />
			<Timer timePassed={timer ? timer : diff} />
			<ul className="App__list">
				<li className="App__item">
					<button onClick={onStartHandler} className="App__btn App__btn--start">
						Start/Stop
					</button>
				</li>
				<li className="App__item">
					<button onClick={onWaitHandler} className="App__btn App__btn--wait">
						Wait
					</button>
				</li>
				<li className="App__item">
					<button onClick={onResetHandler} className="App__btn App__btn--stop">
						Reset
					</button>
				</li>
			</ul>
		</div>
	)
}

export default App

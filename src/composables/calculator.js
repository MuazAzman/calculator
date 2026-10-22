import { ref, onMounted } from 'vue'

export function useCalculator() {
  const currentInput = ref('')
  const history = ref([])

  onMounted(() => {
    const savedHistory = localStorage.getItem('calc_history')
    if (savedHistory) {
      try {
        history.value = JSON.parse(savedHistory)
      } catch (e) {
        console.error('Gagal membaca history dari localStorage', e)
        history.value = []
      }
    }
  })

  const saveToLocalStorage = () => {
    localStorage.setItem('calc_history', JSON.stringify(history.value))
  }

  const handleButtonClick = (btn) => {
    if (btn === 'C') {
      currentInput.value = ''
    } else if (btn === 'Del') {
      currentInput.value = currentInput.value.slice(0, -1)
    } else if (btn === '=') {
      try {
        const expressionToEval = currentInput.value
        const result = Function(`'use strict'; return (${expressionToEval})`)()

        const historyItem = {
          expression: expressionToEval,
          result: result,
        }

        history.value.unshift(historyItem)
        saveToLocalStorage()
        currentInput.value = String(result)
      } catch (error) {
        currentInput.value = 'Error'
      }
    } else {
      if (currentInput.value === 'Error') {
        currentInput.value = ''
      }
      currentInput.value += btn
    }
  }

  const deleteHistoryItem = (index) => {
    history.value.splice(index, 1)
    saveToLocalStorage()
  }

  const clearHistory = () => {
    history.value = []
    localStorage.removeItem('calc_history')
  }

  return {
    currentInput,
    history,
    handleButtonClick,
    deleteHistoryItem,
    clearHistory,
  }
}

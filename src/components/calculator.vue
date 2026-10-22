<template lang="">
  <div class="calculator">
    <!-- Display current input -->
    <div class="result">{{ currentInput }}</div>

    <div class="button-wrapper">
      <!-- Gabungkan semua butang termasuk C dan Del dalam array atau susunan yang konsisten -->
      <button
        v-for="btn in [
          'C',
          'Del',
          '(',
          ')',
          '7',
          '8',
          '9',
          '/',
          '4',
          '5',
          '6',
          '*',
          '1',
          '2',
          '3',
          '-',
          '0',
          '.',
          '=',
          '+',
        ]"
        :key="btn"
        class="button"
        :class="{
          operator: ['/', '*', '-', '+', '='].includes(btn),
          special: ['C', 'Del'].includes(btn),
        }"
        @click="handleButtonClick(btn)"
      >
        {{ btn }}
      </button>
    </div>

    <!-- History Section -->
    <div class="history">
      <h3 class="history-title">History</h3>
      <div class="history-list">
        <p v-if="history.length === 0">No calculations yet</p>
        <div v-else>
          <div
            v-for="(item, index) in history"
            :key="index"
            class="history-item"
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 5px;
            "
          >
            <span
              >{{ item.expression }} = <strong>{{ item.result }}</strong></span
            >
            <!-- Butang delete per each data -->
            <button
              @click="deleteHistoryItem(index)"
              class="delete-item-btn"
              style="
                background: red;
                color: white;
                border: none;
                padding: 2px 6px;
                cursor: pointer;
                border-radius: 4px;
              "
            >
              x
            </button>
          </div>
        </div>
      </div>
      <button v-if="history.length > 0" @click="clearHistory" class="clear-history-btn">
        Clear All History
      </button>
    </div>
  </div>
</template>
<script setup>
import { useCalculator } from '@/composables/calculator.js'

const { currentInput, history, handleButtonClick, deleteHistoryItem, clearHistory } =
  useCalculator()
</script>

<style src="@/styles/calculator.css" scoped></style>

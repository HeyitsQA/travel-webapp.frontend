<template>
  <div>
    <TripCard
      v-for="trip in trips"
      :key="trip.id"
      :trip="trip"
      />
  </div>
</template>


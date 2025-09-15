import { ref } from 'vue'
import { defineStore } from 'pinia';
import type { RouteMapping } from 'journeyplan/routemapping/model';

export const useRouteMapping = defineStore('routemapping',() => {
  const routelist = ref<RouteMapping[]>([])
  const journeylist = ref<RouteMapping[]>([]);

  const getStatus = (status: string | number ) => {
    return status == 'pending' ? 'In Review' : status
  }

  const classColumnStatus = (status: string | number) => {
    if (status == 'In Review')
      return 'bg-semantic-yellow-20 text-semantic-yellow-80';
    else if (status == 'Approved With Propose')
      return 'bg-semantic-blue-20 text-semantic-blue-80';
    else if(status == 'Approved') return 'bg-semantic-green-20 text-semantic-green-80';
    else return 'bg-primary-red-20 text-primary-red-80';
  };

  interface RouteConfirmation {
    latitude:       string;
    longitude:      string;
    outlet_address: string;
    outlet_code:    string;
    outlet_id:      number;
    outlet_name:    string;
    outlet_status:  number;
    route_code:     number;
  }

  const route_confirmation = ref<RouteConfirmation[]>([])

  return {
    routelist,
    journeylist,
    route_confirmation,

    classColumnStatus,
    getStatus,
  }
})
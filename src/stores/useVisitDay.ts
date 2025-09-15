import { ref,computed } from 'vue'
import { defineStore } from 'pinia';
import type {  dataTable,WeekInfo } from 'journeyplan/visitday/model';
import type { RouteMapping } from 'journeyplan/routemapping/model';
export const useVisitDay = defineStore('visitday',() => {

  const getWeeksInCurrentYear = (): WeekInfo[] => {
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, 0, 1); // January 1st of the year
    const endDate = new Date(currentYear, 11, 31); // December 31st of the year
    const weeks: WeekInfo[] = [];
    const currentDate = new Date(startDate);
    let weekNumber = 1;
  
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
  
    while (currentDate <= endDate) {
      const weekStart = new Date(currentDate);
      let weekEnd = new Date(currentDate);
      weekEnd.setDate(weekStart.getDate() + 6);
  
      // Ensure weekEnd does not exceed endDate
      if (weekEnd > endDate) {
        weekEnd = endDate;
      }
  
      const subtitle = `${weekStart
        .getDate()
        .toString()
        .padStart(2, '0')} ${
          monthNames[weekStart.getMonth()]
        } - ${weekEnd.getDate().toString().padStart(2, '0')} ${
        monthNames[weekEnd.getMonth()]
      }`;
  
      weeks.push({
        week: `Week ${weekNumber}`,
        subtitle: subtitle,
        week_number: weekNumber,
        start_week: weekStart,
        checkbox:false,
        showCheckbox:false
      });
  
      currentDate.setDate(currentDate.getDate() + 7); // Move to the next week
      weekNumber++;
    }
  
    return weeks;
  };

  const datas = ref<dataTable[]>([]);
  const routes = ref<RouteMapping[]>([]);
  const allroutes = ref<RouteMapping[]>([]);
  const isEditing = ref(false);
  const parameter = ref('');
  const weeks = ref<WeekInfo[]>(getWeeksInCurrentYear());

  const isLastWeek = (week_number : number) : boolean => {
    return week_number > weeks.value[weeks.value.length - 1].week_number 
  }

  const endweek_number = computed(()=>{
    return weeks.value.reduce((max, current) => {
      return current.week_number > max ? current.week_number : max;
    }, 0)
  })

  return {
    datas,
    routes,
    weeks,
    allroutes,
    isEditing,
    parameter,
    endweek_number,
    isLastWeek
  }
})
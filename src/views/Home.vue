<template>
<v-container
  fill-height
  fluid
  grid-list-xl>
  <v-flex
    xs12
    md12
    >
    <v-col>
      <v-card>
	<v-card-title>Recent progress</v-card-title>
	<v-card-text>
	  <v-list two-line>
	    <v-list-item
              v-for="p in progress"
              :key="p.worksheet"
	      :href="p.url"
	      >
	      <v-list-item-avatar>
		<v-progress-circular
		  :value="100 * p.score"
		  color="light-blue"
		  >{{ Math.ceil( 100*p.score ) }}</v-progress-circular>
	      </v-list-item-avatar>
	      <v-list-item-content>
		<v-list-item-title v-text="p.title"></v-list-item-title>
		<v-list-item-subtitle v-text="p.url"></v-list-item-subtitle>
	      </v-list-item-content>
	      <v-list-item-action>
                <v-list-item-action-text>{{ p.updatedAt | moment('from', 'now') }}</v-list-item-action-text>
	      </v-list-item-action>
	    </v-list-item>
	  </v-list>
	</v-card-text>
      </v-card>
    </v-col>
    <v-col>
      <v-card>
	<v-card-title>Recent events</v-card-title>
	<v-card-text>
	  <v-timeline dense clipped>
	    <v-timeline-item v-for="statement in learnerStatements" :key="statement.id">
	      <learning-statement :statement="statement" />
	    </v-timeline-item>
	  </v-timeline>
	  </v-card-text>
      </v-card>
    </v-col>
  </v-flex>
</v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState([
      'learnerStatements',
      'progress',
    ]),
  },

  data() {
    return {
    };
  },

  methods: {
    ...mapActions([
'getLearnerStatements',
'getRecentProgress',
    ]),
  },

mounted() {
    this.getRecentProgress('me');
    return this.getLearnerStatements();
  },
};
</script>

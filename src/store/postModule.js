import axios from 'axios';

export const postModule = {
  state: () => ({
    isPostLoading: false,
    posts: [],
    selectedSort: '',
    searchQuery: '',
    page: 1,
    limit: 10,
    totalPages: 0,
    sortOptions: [
      {
        value: 'title',
        name: 'Sort by name',
      },
      {
        value: 'body',
        name: 'Sort by description',
      },
    ],
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]));
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter((post) => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()));
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setPostLoading(state, bool) {
      state.isPostLoading = bool;
    },
    setPage(state, page) {
      state.page = page;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
    setSelectedSort(state, sortType) {
      state.selectedSort = sortType;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit('setPostLoading', true);
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _limit: state.limit,
            _page: state.page,
          },
        });
        console.log(response);
        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
        commit('setPosts', response.data);
      } catch (err) {
        console.error('Got error: ', err);
      } finally {
        commit('setPostLoading', false);
      }
    },
    async loadMorePosts({ state, commit }) {
      try {
        commit('setPage', state.page + 1);
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _limit: state.limit,
            _page: state.page,
          },
        });

        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
        commit('setPosts', [...state.posts, ...response.data]);
      } catch (err) {
        console.error('Got error: ', err);
      }
    },
  },
  namespaced: true,
};
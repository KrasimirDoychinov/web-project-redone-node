const { expect } = require('chai');
const sinon = require('sinon');
const stub = sinon.stub;

const postServices = require('./postServices');
const Post = require('./Post');
const { requiredFieldsMsg } = require('../../utils/consts');
const { buildConstraintError } = require('../errorEngine/errorEngine');
const { postConstraints } = require('../../utils/constraints');

describe('postServices', () => {
	let dbMock, mockObj;
	let saveStub, findByIdStub, findByIdAndDeleteStub, deleteManyStub;

	beforeEach(() => {
		dbMock = [];
		mockObj = {
			description: 'description',
			thread: { id: 1 },
			creator: {},
			id: 1,
		};
	});

	beforeEach(() => {
		saveStub = stub(Post.prototype, 'save').callsFake(() => {
			dbMock.push(mockObj);
		});

		findByIdStub = stub(Post, 'findById').callsFake(() => {
			return dbMock.find((x) => x.id === 1);
		});

		findByIdAndDeleteStub = stub(Post, 'findByIdAndDelete').callsFake(() => {
			dbMock = dbMock.filter((x) => x.id !== 1);
		});

		deleteManyStub = stub(Post, 'deleteMany').callsFake(() => {
			dbMock = dbMock.filter((x) => x.thread.id !== 1);
		});
	});

	afterEach(() => {
		saveStub.restore();
		findByIdStub.restore();
		findByIdAndDeleteStub.restore();
		deleteManyStub.restore();
	});

	describe('create', () => {
		it('should increase count in dbMock', () => {
			return postServices
				.create(mockObj.description, mockObj.thread, mockObj.creator)
				.then((res) => {
					expect(dbMock.length).to.eq(1);
				});
		});

		const errorObjs = [
			{ description: 'test', thread: undefined, creator: { name: 'test' } },
			{
				description: undefined,
				thread: { title: 'test' },
				creator: { name: 'test' },
			},
			{ description: 'test', thread: { title: 'test' }, creator: undefined },
		];

		errorObjs.forEach((x) => {
			it('should return obj with error msg if one property is null', () => {
				return postServices
					.create(x.description, x.thread, x.creator)
					.then((res) => {
						expect(res.error).to.be.eq(requiredFieldsMsg);
					});
			});
		});

		const descriptionObjs = [
			{ description: 'small', thread: {}, creator: { name: 'test' } },
			{
				description:
					'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae, unde! Quidem fugiat autem, rerum quae animi laboriosam consequuntur minima similique, inventore voluptate necessitatibus fuga dolores molestiae deserunt numquam quos. Id hic, itaque, ut quod minima, adipisci vitae incidunt nulla earum distinctio enim possimus expedita et autem veritatis. Possimus aliquid consequatur, velit, esse reprehenderit, delectus doloribus error harum libero at ratione? Officiis numquam, ducimus quaerat praesentium ratione repellendus facilis quae reprehenderit fugiat ipsum excepturi provident repellat distinctio tenetur? In non commodi minima explicabo consequuntur, eos iure enim error a atque repellendus soluta quaerat? Voluptate deserunt consequuntur odio explicabo ad nesciunt fugit quibusdam deleniti ex atque, necessitatibus et, suscipit tenetur earum fuga possimus quos sit pariatur minus laborum? Sint consectetur nostrum deserunt eligendi, est quisquam dolorum iusto voluptatem adipisci, exercitationem aliquam saepe quibusdam. Aspernatur, obcaecati velit. Error aliquam quia pariatur perspiciatis id quos, nemo cum illo, dolores necessitatibus tempore perferendis assumenda eum maxime quis sapiente veniam numquam inventore harum, et atque. Fugit suscipit dolorum quae saepe nulla illo voluptatibus asperiores consequuntur. Placeat vel quisquam fuga ipsa nobis vero, provident sed ea, tenetur quis nesciunt natus quam adipisci exercitationem saepe numquam labore. Nobis quas fuga provident, quidem harum nemo ullam voluptatem doloremque quasi, perspiciatis libero nesciunt ea suscipit magni dignissimos deserunt cupiditate corporis obcaecati aliquam a iusto neque inventore. Assumenda, vel possimus, magnam quaerat alias magni eius numquam nobis voluptatem nulla quos? Sint, architecto. Libero ab dolor nam veniam quis ipsam, tempore ex cupiditate hic! Distinctio, voluptatum inventore aperiam quae et quasi animi cum neque accusamus! Voluptates minus similique dicta ipsa magnam officia, fugiat quod laborum, adipisci eaque aspernatur corrupti dolor nulla repellat doloribus aliquid aperiam excepturi modi suscipit! Laudantium in amet cupiditate ducimus debitis architecto incidunt, odio fuga vero totam sed quae commodi numquam quia iure voluptatum asperiores corrupti explicabo enim doloremque fugit suscipit officiis et dolorem. Consequuntur deleniti voluptatum tempora cum eius in! Quibusdam, molestias? Quo fuga ducimus quas consequuntur assumenda corrupti rem nobis blanditiis magnam temporibus fugit animi facere totam, quibusdam saepe accusantium eligendi harum eum asperiores voluptate sint rerum natus unde. Atque, explicabo possimus. Eaque labore, autem inventore, quod, facere molestiae vel aperiam hic deleniti optio dolore veniam vero porro harum excepturi. Quas dolorem dicta dolorum earum asperiores, quaerat necessitatibus amet facilis enim sed veniam delectus quasi voluptas expedita! Explicabo officiis modi quasi molestiae consequuntur id ipsum nostrum blanditiis ullam asperiores ratione deleniti reiciendis accusamus, cum error amet consequatur eum ut, maiores debitis accusantium quos provident! Id similique sunt, assumenda ut excepturi dolores, aperiam nihil, nisi itaque vitae eum voluptatem quas autem? Esse animi ducimus fugit minus error dignissimos id aliquid nam rerum laboriosam, a, inventore quo! Ut eius commodi fugit nam saepe perspiciatis illo dolore, culpa facere natus, hic quidem aliquid. Nobis sunt aut voluptate fuga eaque nostrum repellat esse accusantium dolorem harum exercitationem modi dolor eligendi, rerum omnis aliquid eveniet labore quidem dignissimos aperiam repudiandae quos aspernatur incidunt. Amet sunt esse ad quam doloremque totam quaerat porro illum, quis odio eligendi dignissimos molestiae inventore officia, voluptatum et maiores architecto provident magnam beatae repudiandae numquam nihil culpa voluptates? Aperiam, soluta asperiores! Perspiciatis fugit perferendis necessitatibus explicabo! Consequatur veritatis, nemo debitis in quibusdam, reprehenderit perferendis repudiandae fuga ea nesciunt sit! Ab veniam, dolores iste aperiam nam placeat at vitae provident, blanditiis, sint quidem alias deserunt tenetur quia sit! Praesentium eius veniam recusandae obcaecati, consectetur rerum delectus omnis porro labore sint, voluptate quis odit suscipit possimus nihil laudantium quo. Quo nulla voluptatem eius, hic nihil beatae minus laboriosam ullam porro enim consequatur, assumenda quam voluptates sint, itaque distinctio iure amet asperiores aspernatur sit? Sed laborum necessitatibus autem inventore nostrum omnis adipisci esse! Nesciunt, minus molestias corrupti provident ullam laborum velit quisquam quas recusandae distinctio eum numquam dicta vel vero nemo sed pariatur autem et non! Quae saepe hic officia assumenda deserunt tempore enim similique quidem minus modi doloribus blanditiis quisquam cupiditate voluptatibus, fugit voluptates suscipit id esse! Eum aut numquam, autem provident officia voluptatibus fugit dolore repellat nemo, dicta perspiciatis, doloribus sequi ut architecto. Iure, exercitationem nostrum quae hic, cumque soluta excepturi amet voluptate inventore minus aperiam in dolores consequuntur eius quaerat sunt aspernatur sint voluptates fugiat, temporibus voluptatibus consequatur distinctio rem? Fuga obcaecati omnis molestiae facilis, quasi debitis! Ullam, temporibus soluta? Quod facilis esse dolorum labore illo autem minus dolore ipsum temporibus sed hic, soluta quas exercitationem rem animi dolores aut cupiditate quis quasi totam ex molestiae doloremque rerum unde. Vel, voluptate architecto. Commodi necessitatibus sequi excepturi, at ad, repudiandae hic repellat quasi eveniet architecto sed inventore incidunt dolorem impedit. Accusamus, tempore. Animi, rem? Necessitatibus soluta ducimus itaque blanditiis rem sed facilis rerum perferendis quas, modi commodi tempora minus hic facere eum ipsa nihil? Nam ullam illo porro obcaecati sint aperiam ut expedita, consequuntur repellat optio neque vero animi aspernatur facere beatae itaque laudantium atque vel modi tenetur eum ipsa veritatis numquam! Perspiciatis delectus nihil voluptates ipsum quibusdam ducimus voluptas fuga amet, tenetur praesentium, nobis distinctio sed at dolores beatae! Nisi voluptas vel fuga earum nemo iusto delectus quae, quod repellat quidem illo vitae quaerat rerum quisquam dignissimos beatae eaque, consequuntur ipsa cupiditate enim necessitatibus facere magnam? Aut, dicta.',
				thread: {},
				creator: { name: 'test' },
			},
		];

		descriptionObjs.forEach((x) => {
			it("should return obj with error msg that the given property's length is invalid", () => {
				return postServices
					.create(x.description, x.thread, x.creator)
					.then((res) => {
						expect(res.error).to.eq(
							buildConstraintError(
								'Description',
								postConstraints.descriptionMinLength,
								postConstraints.descriptionMaxLength
							)
						);
					});
			});
		});
	});

	describe('getById', () => {
		it('should return correct object if given correct id', () => {
			postServices.create(mockObj.description, mockObj.thread, mockObj.creator);

			return postServices.getById(1).then((found) => {
				expect(found).to.eql(mockObj);
			});
		});
	});

	describe('deleteById', () => {
		it('should remove obj from db and decrease count', () => {
			postServices.create(mockObj.description, mockObj.thread, mockObj.creator);

			return postServices.deleteById(1).then((res) => {
				expect(dbMock.length).to.eq(0);
			});
		});
	});

	describe('deleteByThreadId', () => {
		it('should delete all posts with the given thread id', () => {
			postServices.create(mockObj.description, mockObj.thread, mockObj.creator);
			postServices.create(mockObj.description, mockObj.thread, mockObj.creator);

			return postServices.deleteByThreadId(1).then((res) => {
				expect(dbMock.length).to.eq(0);
			});
		});
	});

	describe('getVotes', () => {
		it('should return 3 vote if we have 3 upvotes and 0 downvote', () => {
			mockObj = {
				description: 'description',
				thread: { id: 1 },
				creator: {},
				id: 1,
				votes: [{ type: 'upvote' }, { type: 'upvote' }, { type: 'upvote' }],
			};

			const votes = postServices.getVotes(mockObj);
			expect(votes).to.eq(3);
		});

		it('should return 1 vote if we have 2 upvotes and 1 downvote', () => {
			mockObj = {
				description: 'description',
				thread: { id: 1 },
				creator: {},
				id: 1,
				votes: [{ type: 'downvote' }, { type: 'upvote' }, { type: 'upvote' }],
			};

			const votes = postServices.getVotes(mockObj);
			expect(votes).to.eq(1);
		});

		it('should return -1 vote if we have 1 upvotes and 2 downvote', () => {
			mockObj = {
				description: 'description',
				thread: { id: 1 },
				creator: {},
				id: 1,
				votes: [{ type: 'downvote' }, { type: 'downvote' }, { type: 'upvote' }],
			};

			const votes = postServices.getVotes(mockObj);
			expect(votes).to.eq(-1);
		});
	});

	describe('updateDescription', () => {
		beforeEach(() => {
			saveStub.restore();
			saveStub = stub(Post.prototype, 'save').callsFake(() => {
				mockObj.description = 'TEST';
			});
		});

		it('should update description', () => {
			postServices.create(mockObj.description, mockObj.thread, mockObj.creator);
			postServices.updateDescription(1, 'TEST');

			expect(mockObj.description).to.eq('TEST');
		});
	});

	describe('getPopularPostsByThreadId', () => {
		let findStub;

		beforeEach(() => {
			findStub = stub(Post, 'find').callsFake(() => {
				const result = [mockObj];
				Array.prototype.sort = () => result;
				Array.prototype.limit = () => result;

				return result;
			});
		});

		afterEach(() => {
			findStub.restore();
		});

		it('should keep full description if lenght is smaller than 50', () => {
			mockObj = {
				description: 'small description',
				thread: { id: 1 },
				creator: {},
				id: 1,
				createdOn: new Date(),
			};

			postServices.create(mockObj.description, mockObj.thread, mockObj.creator);

			return postServices.getPopularPostsByThreadId(1).then((res) => {
				expect(res[0].description).to.eq(mockObj.description);
			});
		});

		it('should keep full ');
	});
});

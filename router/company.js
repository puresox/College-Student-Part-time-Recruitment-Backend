const Router = require('koa-router');
const uuidv1 = require('uuid/v1');
const fs = require('fs');
const path = require('path');
const companyModel = require('../service/company');
const jobModel = require('../service/job');
const applicationModel = require('../service/application');
const { checkHasSignIn } = require('../middleware/check');

const router = new Router();

router.use(checkHasSignIn);

router
  .get('/:id', async (ctx) => {
    const companyId = ctx.params.id;
    await companyModel
      .findById(companyId)
      .then((company) => {
        ctx.body = {
          success: true,
          msg: company,
        };
      })
      .catch(({ message }) => {
        ctx.body = {
          success: false,
          msg: message,
        };
      });
  })
  .post('/', async (ctx) => {
    const { userid } = ctx;
    const {
      name, type, introduction, scope, specialty, city,
    } = ctx.request.body;
    await companyModel
      .create({
        name,
        type,
        introduction,
        scope,
        specialty,
        city,
        admin: userid,
      })
      .then(() => {
        ctx.body = {
          success: true,
          msg: '创建成功',
        };
      })
      .catch(({ message }) => {
        ctx.body = {
          success: false,
          msg: message,
        };
      });
  })
  .post('/businessLicence', async (ctx) => {
    const { id, businessLicence } = ctx.request.body;
    const dataBuffer = Buffer.from(businessLicence, 'base64');
    const imgname = `${uuidv1()}.jpg`;
    const imgPath = path.resolve(__dirname, `../public/img/${imgname}`);
    fs.writeFileSync(imgPath, dataBuffer);
    await companyModel
      .updateBusinessLicenceById(id, {
        businessLicence: imgname,
        status: true,
      })
      .then(() => {
        ctx.body = {
          success: true,
          msg: '上传成功',
        };
      })
      .catch(({ message }) => {
        ctx.body = {
          success: false,
          msg: message,
        };
      });
  })
  .put('/', async (ctx) => {
    const {
      id, name, type, introduction, scope, specialty, city,
    } = ctx.request.body;
    await companyModel
      .updateCompanyById(id, {
        name,
        type,
        introduction,
        scope,
        specialty,
        city,
      })
      .then(() => {
        ctx.body = {
          success: true,
          msg: '更新成功',
        };
      })
      .catch(({ message }) => {
        ctx.body = {
          success: false,
          msg: message,
        };
      });
  })
  .get('/:id/job', async (ctx) => {
    const { userid } = ctx;
    const companyId = ctx.params.id;
    await companyModel
      .findById(companyId)
      .then(async (company) => {
        if (company.admin.toString() !== userid.toString()) {
          ctx.body = {
            success: false,
            msg: '权限不足',
          };
        } else {
          await jobModel
            .findByCompany(companyId)
            .then((jobs) => {
              ctx.body = {
                success: true,
                msg: jobs,
              };
            })
            .catch(({ message }) => {
              ctx.body = {
                success: false,
                msg: message,
              };
            });
        }
      })
      .catch(({ message }) => {
        ctx.body = {
          success: false,
          msg: message,
        };
      });
  })
  .post('/:id/job', async (ctx) => {
    const { userid } = ctx;
    const companyId = ctx.params.id;
    const {
      name, add, amount, salaryMin, salaryMax, jobInfo, location,
    } = ctx.request.body;
    await companyModel
      .findById(companyId)
      .then(async (company) => {
        if (company.admin.toString() !== userid.toString()) {
          ctx.body = {
            success: false,
            msg: '权限不足',
          };
        } else {
          await jobModel
            .create({
              name,
              add,
              amount,
              salaryMin,
              salaryMax,
              jobInfo,
              location,
              company: companyId,
            })
            .then(() => {
              ctx.body = {
                success: true,
                msg: '发布成功',
              };
            })
            .catch(({ message }) => {
              ctx.body = {
                success: false,
                msg: message,
              };
            });
        }
      })
      .catch(({ message }) => {
        ctx.body = {
          success: false,
          msg: message,
        };
      });
  })
  .put('/:id/job', async (ctx) => {
    const { userid } = ctx;
    const companyId = ctx.params.id;
    const {
      id, name, add, amount, salaryMin, salaryMax, jobInfo, location,
    } = ctx.request.body;
    await companyModel
      .findById(companyId)
      .then(async (company) => {
        if (company.admin.toString() !== userid.toString()) {
          ctx.body = {
            success: false,
            msg: '权限不足',
          };
        } else {
          await jobModel
            .updateById(id, {
              name,
              add,
              amount,
              salaryMin,
              salaryMax,
              jobInfo,
              location,
            })
            .then(() => {
              ctx.body = {
                success: true,
                msg: '修改成功',
              };
            })
            .catch(({ message }) => {
              ctx.body = {
                success: false,
                msg: message,
              };
            });
        }
      })
      .catch(({ message }) => {
        ctx.body = {
          success: false,
          msg: message,
        };
      });
  })
  .del('/:id/job/:jobId', async (ctx) => {
    const { userid } = ctx;
    const { id: companyId, jobId } = ctx.params;
    await companyModel
      .findById(companyId)
      .then(async (company) => {
        if (company.admin.toString() !== userid.toString()) {
          ctx.body = {
            success: false,
            msg: '权限不足',
          };
        } else {
          await jobModel
            .deleteById(jobId)
            .then(() => {
              ctx.body = {
                success: true,
                msg: '删除成功',
              };
            })
            .catch(({ message }) => {
              ctx.body = {
                success: false,
                msg: message,
              };
            });
        }
      })
      .catch(({ message }) => {
        ctx.body = {
          success: false,
          msg: message,
        };
      });
  })
  .get('/:id/job/:jobId', async (ctx) => {
    const { userid } = ctx;
    const { id: companyId, jobId } = ctx.params;
    await companyModel
      .findById(companyId)
      .then(async (company) => {
        if (company.admin.toString() !== userid.toString()) {
          ctx.body = {
            success: false,
            msg: '权限不足',
          };
        } else {
          await applicationModel
            .findByJob(jobId)
            .then((applications) => {
              ctx.body = {
                success: true,
                msg: applications,
              };
            })
            .catch(({ message }) => {
              ctx.body = {
                success: false,
                msg: message,
              };
            });
        }
      })
      .catch(({ message }) => {
        ctx.body = {
          success: false,
          msg: message,
        };
      });
  })
  .post('/:id/job/:jobId/application', async (ctx) => {
    const { userid } = ctx;
    const { id: companyId } = ctx.params;
    const { applicationId, status } = ctx.request.body;
    await companyModel
      .findById(companyId)
      .then(async (company) => {
        if (company.admin.toString() !== userid.toString()) {
          ctx.body = {
            success: false,
            msg: '权限不足',
          };
        } else {
          await applicationModel
            .updateById(applicationId, status)
            .then(() => {
              ctx.body = {
                success: true,
                msg: '成功',
              };
            })
            .catch(({ message }) => {
              ctx.body = {
                success: false,
                msg: message,
              };
            });
        }
      })
      .catch(({ message }) => {
        ctx.body = {
          success: false,
          msg: message,
        };
      });
  });

module.exports = router;
